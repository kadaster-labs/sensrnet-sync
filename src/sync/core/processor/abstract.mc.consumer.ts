import { Event } from '../events/event';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Retry } from './retry';
import { EventStore } from '../../eventstore/event-store';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { MultiChainService } from '../../multichain/multichain.service';

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

  abstract async publishToEventStore(eventMessage: Event): Promise<void> ;

  async listenerLoop(): Promise<void> {
    const offset = await this.getOffset();

    try {
      const items = await this.multichainService.listStreamItems(this.streamName, offset, 10, true);

      for (let i = 0; i < items.length; i++) {
        const streamData = Buffer.from(items[i].data, 'hex').toString();
        try {
          if (!items[i].publishers.some((publisher) => this.addresses.includes(publisher))) {
            await this.publishToEventStore(JSON.parse(streamData));
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

    await this.listenerLoop();
  }
}
