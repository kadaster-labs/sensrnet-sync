import { Injectable, Logger } from '@nestjs/common';
import { MultiChainService } from '../multichain/multichain.service';
import { CheckpointService } from '../checkpoint/checkpoint.service';


@Injectable()
export class OwnerMultiChainConsumer {
    private retryCount: number = 0;
    private maxRetryCount: number = 10;
    private loopInterval: number = 1000;
    private streamName: string = 'owners';
    private checkpointId: string = 'sync-owner-multichain';

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly checkpointService: CheckpointService,
        private readonly multichainService: MultiChainService,
    ){}

    incrementRetryCount() {
        this.retryCount += 1;

        if (this.retryCount < this.maxRetryCount) {
            this.logger.error(`Failed to connect to multichain ${this.retryCount} times. Retrying.`);
        } else {
            this.logger.error(`Failed to connect to multichain ${this.retryCount} times. Exiting.`);
            process.exit(0);
        }
    }

    resetRetryCount() {
        this.retryCount = 0;
    }

    async getOffset() {
        const checkpoint = await this.checkpointService.findOne({_id: this.checkpointId});
        return checkpoint ? checkpoint.offset : 0;
    }

    async setOffset(offset) {
        await this.checkpointService.updateOne({_id: this.checkpointId}, {offset});
    }

    async listenerLoop(callback) {
        const offset = await this.getOffset();

        try {
            const items = await this.multichainService.listStreamItems({
                start: offset,
                stream: this.streamName,
            });

            for (let i = 0; i < items.length; i++) {
                const streamData = Buffer.from(items[i].data, 'hex').toString();
                try {
                    const event = JSON.parse(streamData);
                    await callback(event);
                } catch {
                    this.logger.warn(`Failed to parse stream message '${streamData}' as event.`)
                }

                const newOffset = offset + i + 1;
                await this.setOffset(newOffset);

                this.resetRetryCount();
            }
        } catch (e){
            if (e.code === -703) {
                await this.multichainService.subscribe({stream: this.streamName});
            } else if (e.code === 'ECONNREFUSED') {
                this.incrementRetryCount();
                await this.multichainService.initConnection();
            }
        }

        setTimeout(() => this.listenerLoop(callback), this.loopInterval);
    }
}
