import { Logger, OnModuleInit } from '@nestjs/common';
import { Event as ESEvent } from 'geteventstore-promise';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { MultiChainService } from '../../multichain/multichain.service';
import { Retry } from './retry';

export abstract class AbstractMsConsumer implements OnModuleInit {
    private addresses: string[];
    private loopInterval = 1000;
    private retryMechanism: Retry;

    protected logger: Logger = new Logger(this.constructor.name);

    protected constructor(
        private streamName: string,
        private checkpointId: string,
        protected readonly eventStoreService: EventStore,
        private readonly checkpointService: CheckpointService,
        private readonly multichainService: MultiChainService,
    ) {
        this.retryMechanism = new Retry(10);
    }

    async getOffset(): Promise<number> {
        const checkpoint = await this.checkpointService.findOne({ _id: this.checkpointId });
        return checkpoint ? checkpoint.offset : 0;
    }

    async setOffset(offset: number): Promise<any> {
        await this.checkpointService.updateOne({ _id: this.checkpointId }, { offset });
    }

    abstract async publishToEventStore(eventMessage: ESEvent): Promise<void>;

    async listenerLoop(): Promise<void> {
        const offset = await this.getOffset();

        try {
            const items = await this.multichainService.listStreamItems(this.streamName, offset, 10, true);

            for (let i = 0; i < items.length; i++) {
                const streamData = Buffer.from(items[i].data, 'hex').toString();
                try {
                    if (!items[i].publishers.some((publisher) => this.addresses.includes(publisher))) {
                        const event = JSON.parse(streamData);
                        const { version, eventType, ...data } = event;
                        const eventMessage = { data, metadata: { version }, eventType } as ESEvent;
                        await this.publishToEventStore(eventMessage);
                    }
                } catch (e) {
                    this.logger.warn(`Failed to parse stream message '${streamData}' as event; error: ${e.message}`);
                }

                await this.setOffset(offset + i + 1);
                this.retryMechanism.resetRetryCount();
            }
        } catch (e) {
            if (e.code === -703) {
                await this.multichainService.subscribe(this.streamName);
            } else if (e.code === 'ECONNREFUSED' || e.code == 'ECONNRESET') {
                this.retryMechanism.incrementRetryCount();
                this.multichainService.initConnection();
            } else {
                this.retryMechanism.incrementRetryCount();
                this.logger.error(`Error occurred processing event from multichain: ${e.message}`);
            }
        }

        setTimeout(() => this.listenerLoop(), this.loopInterval);
    }

    async onModuleInit(): Promise<void> {
        try {
            this.addresses = await this.multichainService.getAddresses();
        } catch (e) {
            this.logger.error(`Failed to retrieve blockchain addresses ${e.message}. Exiting.`);
            process.exit(0);
        }

        const disableReading = process.env.DISABLE_CHAIN_READ ? process.env.DISABLE_CHAIN_READ === 'true' : false;
        if (!disableReading) {
            Logger.debug(`Started listening to stream ${this.streamName} on chain.`);
            await this.listenerLoop();
        }
    }
}
