import { KafkaProducer } from './kafka-producer';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { EventStoreService } from '../eventstore/event-store.service';

@Injectable()
export class EventStoreListener implements OnModuleInit{

    private checkpointId: string = 'sync-sensor-es';
    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly kafkaProducer: KafkaProducer,
        private readonly eventStoreService: EventStoreService,
        private readonly checkpointService: CheckpointService,
    ) {}

    subscribeToStreamFrom(streamName, checkpointId, onEvent) {
        const timeoutMs = process.env.EVENT_STORE_TIMEOUT ? Number(process.env.EVENT_STORE_TIMEOUT) : 10000;

        const exitCallback = () => {
            this.logger.error(`Failed to connect to EventStore. Exiting.`);
            process.exit(0);
        }

        const timeout = setTimeout(exitCallback, timeoutMs);
        this.checkpointService.findOne({_id: checkpointId}).then((data) => {
            const offset = data ? data.offset : -1;
            this.logger.log(`Subscribing to ES stream ${streamName} from offset ${offset}.`);

            this.eventStoreService.subscribeToStreamFrom(streamName, offset, onEvent, null, exitCallback)
                .then(() => clearTimeout(timeout), () => this.logger.error(`Failed to subscribe to stream ${streamName}.`));
        }, () => this.logger.error(`Failed to determine offset of stream ${streamName}.`));
    }

    onModuleInit() {
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

                this.kafkaProducer.writeEvent(eventMessageFormatted, callback);
            } else {
                callback();
            }
        };

        this.subscribeToStreamFrom('$ce-sensor', this.checkpointId, onEvent);
    }
}
