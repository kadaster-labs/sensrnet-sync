import { Retry } from './retry';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Event } from '../events/event';
import { MultiChainService } from '../../multichain/multichain.service';
import { SensorRegistered } from '../events/sensor/sensor-registered.event';
import { OrganizationRegistered } from '../events/organization/organization-registered.event';

export class AbstractMultiChainProducer implements OnModuleInit {
  private addresses: string[];
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
      eventMessage = JSON.stringify(event);
      processed = false;
    } catch {
      processed = true;
    }

    if (event.aggregateId) {
      while (!processed) {
        try {
          if (event instanceof OrganizationRegistered || event instanceof SensorRegistered) {
            try {
              const name = event.aggregateId.split('-').join('');
              await this.multichainService.createVariable(name, {addresses: this.addresses});
            } catch (e) {
              this.logger.warn(e.message);
            }
          }
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
    try {
      this.addresses = await this.multichainService.getAddresses();
    } catch (e) {
      this.logger.error(`Failed to retrieve blockchain addresses ${e.message}. Exiting.`);
      process.exit(0);
    }
  }
}
