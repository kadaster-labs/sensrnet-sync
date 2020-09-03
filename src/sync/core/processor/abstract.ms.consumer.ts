import { Logger } from '@nestjs/common';
import { EventStore } from '../../eventstore/event-store';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { MultiChainService } from '../../multichain/multichain.service';
import { Event } from '../events/event';

export abstract class AbstractMsConsumer {
  private retryCount = 0;
  private maxRetryCount = 10;
  private loopInterval = 1000;

  protected logger: Logger = new Logger(this.constructor.name);

  protected constructor(
    private streamName: string,
    private checkpointId: string,
    protected readonly eventStoreService: EventStore,
    private readonly checkpointService: CheckpointService,
    private readonly multichainService: MultiChainService,
  ) {
  }

  incrementRetryCount(): void {
    this.retryCount += 1;

    if (this.retryCount < this.maxRetryCount) {
      this.logger.error(`Failed to connect to multichain ${this.retryCount} times. Retrying.`);
    } else {
      this.logger.error(`Failed to connect to multichain ${this.retryCount} times. Exiting.`);
      process.exit(0);
    }
  }

  resetRetryCount(): void {
    this.retryCount = 0;
  }

  async getOffset(): Promise<number> {
    const checkpoint = await this.checkpointService.findOne({ _id: this.checkpointId });
    return checkpoint ? checkpoint.offset : 0;
  }

  async setOffset(offset: number): Promise<any> {
    await this.checkpointService.updateOne({ _id: this.checkpointId }, { offset });
  }

  async listenerLoop(callback: (event: Event) => Promise<void>): Promise<void> {
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
          this.logger.warn(`Failed to parse stream message '${streamData}' as event.`);
        }

        const newOffset = offset + i + 1;
        await this.setOffset(newOffset);

        this.resetRetryCount();
      }
    } catch (e) {
      if (e.code === -703) {
        await this.multichainService.subscribe({ stream: this.streamName });
      } else if (e.code === 'ECONNREFUSED') {
        this.incrementRetryCount();
        await this.multichainService.initConnection();
      } else {
        this.logger.warn(`Error occurred processing event from multichain: ${e}`);
      }
    }

    setTimeout(() => this.listenerLoop(callback), this.loopInterval);
  }

}
