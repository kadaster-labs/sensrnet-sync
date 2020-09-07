import { Logger } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { Event } from '../events/event';

export class AbstractMultiChainProducer {

  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly streamName: string,
    private readonly multichainService: MultiChainService,
  ) {
  }

  async publishEvent(event: Event, callback: () => Promise<void>): Promise<void> {
    try {
      await this.multichainService.createTransaction(this.streamName, event.aggregateId, JSON.stringify(event));
      await callback();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
