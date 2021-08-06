import { Logger, OnModuleInit } from '@nestjs/common';
import { EventStoreCatchUpSubscription } from 'node-eventstore-client';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { NoSubscriptionException } from '../errors/no-subscription-exception';
import { SubscriptionExistsException } from '../errors/subscription-exists-exception';
import { AbstractEventType } from '../events/abstract-event-type';
import { Event } from '../events/event';
import { AbstractMultiChainProducer } from './abstract.mc.producer';

export abstract class AbstractESListener implements OnModuleInit {
    private subscription: EventStoreCatchUpSubscription;

    protected logger: Logger = new Logger(this.constructor.name);

    protected constructor(
        protected readonly streamName: string,
        protected readonly checkpointId: string,
        protected readonly eventType: AbstractEventType,
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
            await this.subscribeToStreamFromLastOffset();
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

    async subscribeToStreamFromLastOffset(): Promise<void> {
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
            this.logger.log(`Subscribing to ES stream ${this.streamName} from offset ${offset}.`);

            const onEvent = async (_, eventMessage) => {
                if (eventMessage.positionEventNumber > offset) {
                    const conditions = { _id: this.checkpointId };
                    const update = { offset: eventMessage.positionEventNumber };
                    const callback = async () => this.checkpointService.updateOne(conditions, update);

                    if (!eventMessage.metadata || !eventMessage.metadata.originSync) {
                        const eventData = {
                            ...eventMessage,
                            data: { ...eventMessage.data, eventType: eventMessage.eventType },
                        };
                        const event: Event = this.eventType.getEvent(eventData);

                        if (event) {
                            await this.multichainProducer.publishEvent(event);
                        }
                    }
                    await callback();
                }
            };

            try {
                const subscription = await this.eventStoreService.subscribeToStreamFrom(
                    this.streamName,
                    offset,
                    onEvent,
                    null,
                    droppedCallback,
                );
                clearTimeout(timeout);

                this.setSubscription(subscription);
            } catch {
                this.logger.error(`Failed to subscribe to stream ${this.streamName}.`);
            }
        } catch {
            this.logger.error(`Failed to determine offset of stream ${this.streamName}.`);
        }
    }

    async onModuleInit(): Promise<void> {
        await this.openSubscription();
    }
}
