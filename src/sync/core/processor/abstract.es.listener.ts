import { Logger, OnModuleInit } from '@nestjs/common';
import { EventStore } from '../../eventstore/event-store';
import { EventStoreCatchUpSubscription } from 'node-eventstore-client';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { NoSubscriptionException } from '../errors/no-subscription-exception';
import { SubscriptionExistsException } from '../errors/subscription-exists-exception';

export abstract class AbstractESListener implements OnModuleInit {

  private subscription: EventStoreCatchUpSubscription;

  protected logger: Logger = new Logger(this.constructor.name);

  protected constructor(
    protected checkpointId: string,
    protected readonly eventStoreService: EventStore,
    protected readonly checkpointService: CheckpointService) {
  }

  getSubscription(): EventStoreCatchUpSubscription {
    return this.subscription;
  }

  setSubscription(subscription: EventStoreCatchUpSubscription): void {
    this.subscription = subscription;
  }

  subscriptionExists(): boolean {
    return !!this.getSubscription();
  }

  closeSubscription(): void {
    if (this.subscription) {
      this.subscription.stop();
      this.subscription = null;
    } else {
      throw new NoSubscriptionException();
    }
  }

  abstract openSubscription(): Promise<void>;

  async getOffset(): Promise<number> {
    const checkpoint = await this.checkpointService.findOne({ _id: this.checkpointId });
    return checkpoint ? checkpoint.offset : -1;
  }

  async setOffset(offset: number): Promise<void> {
    if (!this.subscriptionExists()) {
      await this.checkpointService.updateOne({ _id: this.checkpointId }, { offset });
    } else {
      throw new SubscriptionExistsException();
    }
  }

  async subscribeToStreamFrom(
    streamName: string,
    checkpointId: string,
    onEvent: (_: any, eventMessage: any) => Promise<void>
  ): Promise<void> {
    const timeoutMs = process.env.EVENT_STORE_TIMEOUT ? Number(process.env.EVENT_STORE_TIMEOUT) : 10000;

    const exitCallback = () => {
      this.logger.error(`Failed to connect to EventStore. Exiting.`);
      process.exit(0);
    };

    const droppedCallback = (_, reason) => {
      if (reason !== 'userInitiated') {
        exitCallback();
      }
    };

    const timeout = setTimeout(exitCallback, timeoutMs);
    try {
      const offset = await this.getOffset();
      this.logger.log(`Subscribing to ES stream ${streamName} from offset ${offset}.`);

      try {
        const subscription = await this.eventStoreService.subscribeToStreamFrom(streamName, offset, onEvent,
          null, droppedCallback);
        clearTimeout(timeout);

        this.setSubscription(subscription);
      } catch {
        this.logger.error(`Failed to subscribe to stream ${streamName}.`);
      }
    } catch {
      this.logger.error(`Failed to determine offset of stream ${streamName}.`);
    }
  }

  async onModuleInit(): Promise<void> {
    await this.openSubscription();
  }
}
