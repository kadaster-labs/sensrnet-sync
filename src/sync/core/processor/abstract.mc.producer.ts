import { Retry } from './retry';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Event } from '../events/event';
import { MultiChainService } from '../../multichain/multichain.service';

export class AbstractMultiChainProducer implements OnModuleInit {
  private address: string;
  private retryMechanism: Retry;
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly streamName: string,
    private readonly multichainService: MultiChainService,
  ) {
    this.retryMechanism = new Retry(10);
  }

  async publishEvent(event: Event): Promise<void> {
    let processed, eventMessage;
    try {
      eventMessage = JSON.stringify({source: this.address, ...event});
      processed = false;
    } catch {
      processed = true;
    }

    if (event.aggregateId) {
      while (!processed) {
        try {
          await this.multichainService.createTransaction(this.streamName, event.aggregateId, eventMessage);
          processed = true;
        } catch (e) {
          this.logger.error(`Failed to publish transaction: ${e.message}.`);

          this.retryMechanism.incrementRetryCount();
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    this.retryMechanism.resetRetryCount();
  }

  async onModuleInit(): Promise<void> {
    const addresses = await this.multichainService.getAddresses();
    this.address = addresses[0];
  }
}
