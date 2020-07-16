import { UserCredentials } from 'node-eventstore-client';
import { KafkaProducer } from '../kafka/kafka-producer';
import { EventStoreConnection } from './eventstore.connection';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStoreConfiguration } from '../../../event-store.configuration';

@Injectable()
export class EventStoreInterface implements OnModuleInit{

    private checkpointId: string = 'sync-sensor-es';
    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly kafkaProducer: KafkaProducer,
        private readonly checkpointService: CheckpointService,
        private readonly eventStoreConnection: EventStoreConnection,
        private readonly eventStoreConfiguration: EventStoreConfiguration,
    ) {}

    listen(streamName, onEvent) {
        const config = this.eventStoreConfiguration.config;
        const connection = this.eventStoreConnection.getConnection();
        const credentials = new UserCredentials(config.credentials.username, config.credentials.password);

        const timeoutMs = process.env.EVENT_STORE_TIMEOUT ? Number(process.env.EVENT_STORE_TIMEOUT) : 10000;
        const timeout = setTimeout(() => {
            this.logger.error(`Failed to connect to EventStore. Exiting.`);
            process.exit(0);
        }, timeoutMs);

        const onDropped = () => {
            this.logger.warn(`Event stream dropped. Retrying in ${timeoutMs}ms.`);
            setTimeout(() => this.listen(streamName, onEvent), timeoutMs);
        };

        const liveProcessingStartedCallback = () => {
            this.logger.log(`Catched up to stream ${streamName}.`);
        }

        connection.once('connected', () => {
            this.checkpointService.findOne({_id: this.checkpointId}).then(async (data) => {
                const offset = data ? data.offset : 0;
                try {
                    await connection.subscribeToStreamFrom(streamName, offset, true, onEvent,
                        liveProcessingStartedCallback, onDropped, credentials);
                    clearTimeout(timeout);
                } catch {
                    this.logger.error(`Failed to subscribe to stream ${streamName}.`)
                }
            });
        });

        connection.on('closed', () => this.logger.error(`Connection to EventStore has been closed.`));
    }

    onModuleInit() {
        const onEvent = (_, event) => {
            const offset = Number(event.link.eventNumber);
            const callback = () => this.checkpointService.updateOne({_id: this.checkpointId}, {offset});

            const eventStoreEvent = {
                eventType: event.event.eventType,
                data: JSON.parse(event.event.data.toString()),
            };
            if (event.event.metadata) {
                eventStoreEvent['metadata'] = JSON.parse(event.event.metadata.toString())
            }

            if (!eventStoreEvent['metadata'] || !eventStoreEvent['metadata'].originSync) {
                const eventMessageFormatted = {
                    ...eventStoreEvent.data,
                    eventType: eventStoreEvent.eventType,
                }

                this.kafkaProducer.writeEvent(eventMessageFormatted, callback);
            }
        };

        this.listen('$ce-sensor', onEvent);
    }
}
