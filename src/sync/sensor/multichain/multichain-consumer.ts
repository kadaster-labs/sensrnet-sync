import * as multichain from 'multichain-node';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { MultichainConfiguration } from '../../../multichain.configuration';

@Injectable()
export class MultichainConsumer implements OnModuleInit {

    private connection;
    private retryCount = 0;
    private maxRetryCount = 10;
    private checkpointId: string = 'sync-sensor-multichain';

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly checkpointService: CheckpointService,
        private readonly multichainConfiguration: MultichainConfiguration,
    ){};

    async initConnection() {
        const config = this.multichainConfiguration.config;

        this.connection = multichain({
            port: config.port,
            host: config.hostname,
            user: config.username,
            pass: config.password,
        });
    }

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

    async listenerLoop(callback) {
        const stream = 'sensors';
        const data = await this.checkpointService.findOne({_id: this.checkpointId});
        const offset = data ? data.offset : 0;

        try {
            const items = await this.connection.listStreamItems({
                start: offset,
                stream: stream,
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
                const updateOffset = { offset: newOffset };
                await this.checkpointService.updateOne({_id: this.checkpointId}, updateOffset);

                this.resetRetryCount();
            }
        } catch (e){
            if (e.code === -703) {
                await this.connection.subscribe({stream: stream});
            } else if (e.code === 'ECONNREFUSED') {
                this.incrementRetryCount();
                await this.initConnection();
            }
        }

        setTimeout(() => this.listenerLoop(callback), 1000);
    }

    async onModuleInit() {
        await this.initConnection();
    }
}
