const multichain = require('multichain-node');
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CheckpointService } from '../checkpoint/checkpoint.service';

@Injectable()
export class MultichainConsumer implements OnModuleInit {

    private connection;
    private checkpointId: string = 'sync-sensor-kafka';

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly checkpointService: CheckpointService,
    ){};

    async listenerLoop(callback) {
        const data = await this.checkpointService.findOne({_id: this.checkpointId});
        const offset = data ? data.offset : 0;

        try {
            const items = await this.connection.listStreamItems({
                stream: 'sensors',
                start: offset,
                verbose: true
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
                await this.connection.subscribe({stream: 'sensors'});
            }
        }

        setTimeout(() => this.listenerLoop(callback), 5000);
    }

    async onModuleInit() {
        this.connection = multichain({
            port: 8002,
            host: '127.0.0.1',
            user: 'multichainrpc',
            pass: 'password'
        });

        const data = await this.checkpointService.findOne({_id: this.checkpointId});
        const offset = data ? data.offset : 0;
    }
}
