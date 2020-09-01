import { Event } from '../events/event';
import { plainToClass } from 'class-transformer';
import { sensorEventType } from '../events/sensor';
import { SensorMultiChainProducer } from './sensormc.producer';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { EventStoreService } from '../eventstore/event-store.service';
import { NoSubscriptionException } from './errors/no-subscription-exception';
import { SubscriptionExistsException } from './errors/subscription-exists-exception';

@Injectable()
export class EventStoreListener implements OnModuleInit{
    private subscription;
    private checkpointId: string = 'sync-sensor-es';

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventStoreService: EventStoreService,
        private readonly checkpointService: CheckpointService,
        private readonly multichainProducer: SensorMultiChainProducer,
    ) {}

    getSubscription() {
        return this.subscription;
    }

    setSubscription(subscription) {
        this.subscription = subscription;
    }

    subscriptionExists() {
        return !!this.getSubscription();
    }

    closeSubscription() {
        if (this.subscription) {
            this.subscription.stop();
            this.subscription = null;
        } else {
            throw new NoSubscriptionException();
        }
    }

    async openSubscription() {
        if (!this.subscriptionExists()) {
            const onEvent = async (_, eventMessage) => {
                const conditions = {_id: this.checkpointId};
                const update = {offset: eventMessage.positionEventNumber};
                const callback = () => this.checkpointService.updateOne(conditions, update);

                if (!eventMessage['metadata'] || !eventMessage['metadata'].originSync) {
                    const eventMessageFormatted = {
                        ...eventMessage.data,
                        eventType: eventMessage.eventType,
                    }

                    const event: Event = plainToClass(sensorEventType.getType(eventMessage.eventType),
                        eventMessageFormatted as Event);
                    await this.multichainProducer.writeEvent(event, callback);
                } else {
                    await callback();
                }
            };

            await this.subscribeToStreamFrom('$ce-sensor', this.checkpointId, onEvent);
        } else {
            throw new SubscriptionExistsException();
        }
    }

    async getOffset() {
        const checkpoint = await this.checkpointService.findOne({_id: this.checkpointId});
        return checkpoint ? checkpoint.offset : -1;
    }

    async setOffset(offset) {
        if (!this.subscriptionExists()) {
            await this.checkpointService.updateOne({_id: this.checkpointId}, {offset});
        } else {
            throw new SubscriptionExistsException();
        }
    }

    async subscribeToStreamFrom(streamName, checkpointId, onEvent) {
        const timeoutMs = process.env.EVENT_STORE_TIMEOUT ? Number(process.env.EVENT_STORE_TIMEOUT) : 10000;

        const exitCallback = () => {
            this.logger.error(`Failed to connect to EventStore. Exiting.`);
            process.exit(0);
        }

        const droppedCallback = (_, reason) => {
            if (reason !== 'userInitiated') {
                exitCallback();
            }
        }

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

    async onModuleInit() {
        await this.openSubscription();
    }
}
