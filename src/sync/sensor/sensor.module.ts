import { SensorController } from './sensor.controller';
import { MultiChainService } from './multichain/multichain.service';
import { MultichainConsumer } from './multichain/multichain-consumer';
import { MultichainProducer } from './multichain/multichain-producer';
import { EventStoreListener } from './eventstore.listener';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { CheckpointModule } from '../checkpoint/checkpoint.module';
import { EventStoreModule } from '../eventstore/event-store.module';
import { EventStoreService } from '../eventstore/event-store.service';
import { MultichainConfiguration } from '../../multichain.configuration';

@Module({
  imports: [
    CheckpointModule,
    EventStoreModule,
    SensorQueryModule,
  ],
  controllers: [
    SensorController,
  ],
  providers: [
    EventStoreService,
    MultiChainService,
    EventStoreListener,
    MultichainConsumer,
    MultichainProducer,
    MultichainConfiguration,
    MultichainConfiguration,
  ],
})

export class SensorQueryModule implements OnModuleInit {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly eventStoreService: EventStoreService,
    private readonly multichainConsumer: MultichainConsumer,
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
