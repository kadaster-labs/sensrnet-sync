import { Injectable, Logger } from '@nestjs/common';
import { MultiChainService } from '../multichain/multichain.service';

@Injectable()
export class SensorMultiChainProducer {

    private streamName: string = 'sensors';

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly multichainService: MultiChainService,
    ){}

    async writeEvent(event, callback) {
        try {
            await this.multichainService.createTransaction(this.streamName, JSON.stringify(event));
            await callback();
        } catch (e) {
            this.logger.error(e);
        }
    }
}
