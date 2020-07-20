import { KafkaProducer } from './kafka/kafka-producer';
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

    subscribeToStreamWithReconnect(streamName, checkpointId, onEvent) {
        const timeoutMs = process.env.EVENT_STORE_TIMEOUT ? Number(process.env.EVENT_STORE_TIMEOUT) : 10000;

        const timeout = setTimeout(() => {
            this.logger.error(`Failed to connect to EventStore. Exiting.`);
            process.exit(0);
        }, timeoutMs);

        const onDropped = () => {
            this.logger.warn(`Event stream dropped. Retrying in ${timeoutMs}ms.`);
            setTimeout(() => this.subscribeToStreamWithReconnect(streamName, checkpointId, onEvent), timeoutMs);
        };

        this.checkpointService.findOne({_id: checkpointId}).then((data) => {
            const offset = data ? data.offset : -1;
            this.logger.log(`Subscribing to stream ${streamName} from offset ${offset}.`);
            this.eventStoreService.subscribeToStreamFrom(streamName, offset, onEvent, null, onDropped)
                .then(() => clearTimeout(timeout), () => this.logger.error(`Failed to subscribe to stream ${streamName}.`));
        }, () => this.logger.error(`Failed to determine offset of stream ${streamName}.`));
    }

    onModuleInit() {
        const onEvent = (_, eventMessage) => {
            if (!eventMessage['metadata'] || !eventMessage['metadata'].originSync) {
                const offset = eventMessage.positionEventNumber;
                const callback = () => {
                    this.checkpointService.updateOne({_id: this.checkpointId}, {offset});
                }

                const eventMessageFormatted = {
                    ...eventMessage.data,
                    eventType: eventMessage.eventType,
                }

                this.kafkaProducer.writeEvent(eventMessageFormatted, callback);
            }
        };

        this.subscribeToStreamWithReconnect('$ce-sensor', this.checkpointId, onEvent);
    }
}
