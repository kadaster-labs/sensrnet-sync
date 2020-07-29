import { MultichainProducer } from './multichain/multichain-producer';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { EventStoreService } from '../eventstore/event-store.service';
import { SubscriptionExistsException } from './errors/subscription-exists-exception';
import { NoSubscriptionException } from './errors/no-subscription-exception';

@Injectable()
export class EventStoreListener implements OnModuleInit{

    private subscription;
    private checkpointId: string = 'sync-sensor-es';

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventStoreService: EventStoreService,
        private readonly checkpointService: CheckpointService,
        private readonly multichainProducer: MultichainProducer,
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

    openSubscription() {
        if (!this.subscriptionExists()) {
            const onEvent = (_, eventMessage) => {
                const offset = eventMessage.positionEventNumber;
                const callback = () => {
                    this.checkpointService.updateOne({_id: this.checkpointId}, {offset});
                }

                if (!eventMessage['metadata'] || !eventMessage['metadata'].originSync) {
                    const eventMessageFormatted = {
                        ...eventMessage.data,
                        eventType: eventMessage.eventType,
                    }

                    this.multichainProducer.writeEvent(eventMessageFormatted, callback);
                } else {
                    callback();
                }
            };

            this.subscribeToStreamFrom('$ce-sensor', this.checkpointId, onEvent);
        } else {
            throw new SubscriptionExistsException();
        }
    }

    subscribeToStreamFrom(streamName, checkpointId, onEvent) {
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
        this.checkpointService.findOne({_id: checkpointId}).then((data) => {
            const offset = data ? data.offset : -1;
            this.logger.log(`Subscribing to ES stream ${streamName} from offset ${offset}.`);

            this.eventStoreService.subscribeToStreamFrom(streamName, offset, onEvent, null, droppedCallback)
                .then((s) => {
                    clearTimeout(timeout);
                    this.setSubscription(s);
                }, () => this.logger.error(`Failed to subscribe to stream ${streamName}.`));
        }, () => this.logger.error(`Failed to determine offset of stream ${streamName}.`));
    }

    onModuleInit() {
        this.openSubscription();
    }
}
