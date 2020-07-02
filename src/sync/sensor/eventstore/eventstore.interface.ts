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
    ) {
    }

    onSubscriptionDropped(subscription, reason, error) {
        this.logger.log(error ? error : 'Subscription dropped.');
    }

    onClosed(reason) {
        this.logger.log(`Connection closed, reason: ${reason}`);
    }

    listen(streamName, onEvent) {
        const config = this.eventStoreConfiguration.config;
        const connection = this.eventStoreConnection.getConnection();
        const credentials = new UserCredentials(config.credentials.username, config.credentials.password);

        connection.once('connected', _ => {
            connection.subscribeToStream(streamName, true, onEvent, this.onSubscriptionDropped,
                credentials).then();
        });

        connection.on('closed', this.onClosed);
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
