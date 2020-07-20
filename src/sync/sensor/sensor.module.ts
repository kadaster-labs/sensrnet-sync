import { KafkaConsumer } from './kafka/kafka-consumer';
import { KafkaProducer } from './kafka/kafka-producer';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { KafkaConfiguration } from '../../kafka.configuration';
import { CheckpointModule } from '../checkpoint/checkpoint.module';
import { EventStoreModule } from '../eventstore/event-store.module';
import { EventStoreService } from '../eventstore/event-store.service';
import { EventStoreListener } from "./eventstore.listener";


@Module({
  imports: [
    CheckpointModule,
    EventStoreModule,
  ],
  providers: [
    KafkaConsumer,
    KafkaProducer,
    EventStoreService,
    KafkaConfiguration,
    EventStoreListener,
  ],
})

export class SensorQueryModule implements OnModuleInit {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly kafkaConsumer: KafkaConsumer,
    private readonly eventStoreService: EventStoreService,
  ) {}

  eventListener(eventStoreService, eventMessage) {
    const metaData = { originSync: true };
    const streamId = `sensor-${eventMessage.aggregateId}`;

    const event = {
      streamId, eventType: eventMessage.eventType,
      data: eventMessage, metadata: metaData,
    }

    eventStoreService.createEvent(event);
  }

  onModuleInit() {
    this.kafkaConsumer.registerListener((message) => this.eventListener(this.eventStoreService, message));
  }
}
