import { KafkaConsumer } from './kafka/kafka-consumer';
import { KafkaProducer } from './kafka/kafka-producer';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { KafkaConfiguration } from '../../kafka.configuration';
import { CheckpointModule } from '../checkpoint/checkpoint.module';
import { EventStoreInterface } from './eventstore/eventstore.interface';
import { EventStoreConnection } from './eventstore/eventstore.connection';
import { EventStoreConfiguration } from '../../event-store.configuration';
import { createJsonEventData, expectedVersion } from 'node-eventstore-client';


@Module({
  imports: [
    CheckpointModule,
  ],
  providers: [
    KafkaConsumer,
    KafkaProducer,
    KafkaConfiguration,
    EventStoreInterface,
    EventStoreConnection,
    EventStoreConfiguration,
  ],
})

export class SensorQueryModule implements OnModuleInit {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly kafkaConsumer: KafkaConsumer,
    private readonly eventStoreInterface: EventStoreInterface,
    private readonly eventStoreConnection: EventStoreConnection,
  ) {}

  eventListener(eventStoreConnection, eventMessage) {
    const metaData = { originSync: true };
    const streamId = `sensor-${eventMessage.aggregateId}`;
    const event = createJsonEventData(eventMessage.eventId, eventMessage, metaData, eventMessage.eventType);

    const connection = eventStoreConnection.getConnection();
    connection.appendToStream(streamId, expectedVersion.any, event)
        .then(_ => this.logger.log(`Sync event ${eventMessage.eventId} has been written to the EventStore.`))
        .catch(_ => this.logger.error('An error has occurred while writing to the EventStore.'));
  }

  onModuleInit() {
    this.kafkaConsumer.registerListener((message) => this.eventListener(this.eventStoreConnection, message));
  }
}
