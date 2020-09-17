import { Retry } from './retry';
import { Logger } from '@nestjs/common';
import { Event } from '../events/event';
import { MultiChainService } from '../../multichain/multichain.service';

export class AbstractMultiChainProducer {

  private retryMechanism: Retry;
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly streamName: string,
    private readonly multichainService: MultiChainService,
  ) {
    this.retryMechanism = new Retry(10);
  }

  async publishEvent(event: Event, callback: () => Promise<void>): Promise<void> {
    let published;
    while (!published) {
      try {
        await this.multichainService.createTransaction(this.streamName, event.aggregateId, JSON.stringify(event));
        published = true;
      } catch (e) {
        this.retryMechanism.incrementRetryCount();
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.logger.error(`Failed to publish transaction: ${e.message}. Retrying.`);
      }
    }

    await callback();
    this.retryMechanism.resetRetryCount();
  }
}
