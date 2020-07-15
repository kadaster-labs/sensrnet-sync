import { UserCredentials } from 'node-eventstore-client';
import { KafkaProducer } from '../../kafka/kafka-producer';
import { EventStoreConnection } from './eventstore.connection';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventStoreConfiguration } from '../../../event-store.configuration';

@Injectable()
export class EventStoreInterface implements OnModuleInit{

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly kafkaProducer: KafkaProducer,
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

        connection.once('connected', () => {
            connection.subscribeToStream(streamName, true, onEvent, onDropped, credentials)
                .then(() => clearTimeout(timeout), () => this.logger.error('Failed to subscribe to stream.'));
        });

        connection.on('closed', () => this.logger.error(`Connection to EventStore has been closed.`));
    }

    onModuleInit() {
        const onEvent = (_, event) => {
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

                this.kafkaProducer.writeEvent(eventMessageFormatted);
            }
        };

        this.listen('$ce-sensor', onEvent);
    }
}
