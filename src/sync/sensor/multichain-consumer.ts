import * as multichain from 'multichain-node';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { MultichainConfiguration } from '../../multichain.configuration';

@Injectable()
export class MultichainConsumer implements OnModuleInit {

    private connection;
    private checkpointId: string = 'sync-sensor-kafka';

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly checkpointService: CheckpointService,
        private readonly multichainConfiguration: MultichainConfiguration,
    ){};

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
                const event = JSON.parse(Buffer.from(items[i].data, 'hex').toString());
                await callback(event);

                const newOffset = offset + i + 1;
                const updateOffset = { offset: newOffset };
                await this.checkpointService.updateOne({_id: this.checkpointId}, updateOffset);
            }
        } catch (e){
            if (e.code === -703) {
                await this.connection.subscribe({stream: stream});
            }
        }

        setTimeout(() => this.listenerLoop(callback), 1000);
    }

    async onModuleInit() {
        const config = this.multichainConfiguration.config;

        this.connection = multichain({
            port: config.port,
            host: config.hostname,
            user: config.username,
            pass: config.password,
        });
    }
}
