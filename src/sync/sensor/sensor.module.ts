import { MultichainConsumer } from './multichain-consumer';
import { MultichainProducer } from './multichain-producer';
import { EventStoreListener } from './eventstore.listener';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { KafkaConfiguration } from '../../kafka.configuration';
import { CheckpointModule } from '../checkpoint/checkpoint.module';
import { EventStoreModule } from '../eventstore/event-store.module';
import { EventStoreService } from '../eventstore/event-store.service';


@Module({
  imports: [
    CheckpointModule,
    EventStoreModule,
  ],
  providers: [
    MultichainConsumer,
    MultichainProducer,
    EventStoreService,
    KafkaConfiguration,
    EventStoreListener,
  ],
})

export class SensorQueryModule implements OnModuleInit {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly multichainConsumer: MultichainConsumer,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async eventListener(eventStoreService, eventMessage) {
    const metaData = { originSync: true };
    const streamId = `sensor-${eventMessage.aggregateId}`;

    const event = {
      streamId, eventType: eventMessage.eventType,
      data: eventMessage, metadata: metaData,
    }

    await eventStoreService.createEvent(event);
  }

  onModuleInit() {
    this.multichainConsumer.listenerLoop((message) => this.eventListener(this.eventStoreService, message));
  }
}
