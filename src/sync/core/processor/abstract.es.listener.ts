import { Logger, OnModuleInit } from '@nestjs/common';
import { EventStore } from '../../eventstore/event-store';
import { EventStoreCatchUpSubscription } from 'node-eventstore-client';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { NoSubscriptionException } from '../errors/no-subscription-exception';
import { SubscriptionExistsException } from '../errors/subscription-exists-exception';
import { Event } from '../events/event';
import { plainToClass } from 'class-transformer';
import { AbstractMultiChainProducer } from './abstract.mc.producer';

export abstract class AbstractESListener implements OnModuleInit {
  private subscription: EventStoreCatchUpSubscription;

  protected logger: Logger = new Logger(this.constructor.name);

  protected constructor(
    protected readonly streamName: string,
    protected readonly checkpointId: string,
    protected readonly eventType: Record<any, any>,
    protected readonly eventStoreService: EventStore,
    protected readonly checkpointService: CheckpointService,
    protected readonly multichainProducer: AbstractMultiChainProducer,
  ) {}

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

  async openSubscription(): Promise<void> {
    if (!this.subscriptionExists()) {
      const onEvent = async (_, eventMessage) => {
        const conditions = { _id: this.checkpointId };
        const update = { offset: eventMessage.positionEventNumber };
        const callback = async () => this.checkpointService.updateOne(conditions, update);

        if (!eventMessage['metadata'] || !eventMessage['metadata'].originSync) {
          const eventType = this.eventType.getType(eventMessage.eventType);

          if (eventType) {
            const eventMessageFormatted = {...eventMessage.data, eventType: eventMessage.eventType };
            const event: Event = plainToClass(eventType, eventMessageFormatted as Event);
            await this.multichainProducer.publishEvent(event);
          }
        }
        await callback();
      };

      await this.subscribeToStreamFrom(this.streamName, this.checkpointId, onEvent);
    } else {
      throw new SubscriptionExistsException();
    }
  }

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
