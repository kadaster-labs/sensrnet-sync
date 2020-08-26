import { EventStoreListener } from './eventstore.listener';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { EventStoreController } from './eventstore.controller';
import { SensorMultiChainConsumer } from './sensormc.consumer';
import { SensorMultiChainProducer } from './sensormc.producer';
import { MultiChainModule } from '../multichain/multichain.module';
import { CheckpointModule } from '../checkpoint/checkpoint.module';
import { SensorMultiChainController } from './sensormc.controller';
import { EventStoreModule } from '../eventstore/event-store.module';
import { EventStoreService } from '../eventstore/event-store.service';
import { MultichainConfiguration } from '../../multichain.configuration';


@Module({
  imports: [
    CheckpointModule,
    EventStoreModule,
    MultiChainModule,
    SensorQueryModule,
  ],
  controllers: [
    EventStoreController,
    SensorMultiChainController,
  ],
  providers: [
    EventStoreService,
    EventStoreListener,
    MultichainConfiguration,
    SensorMultiChainConsumer,
    SensorMultiChainProducer,
  ],
})

export class SensorQueryModule implements OnModuleInit {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly eventStoreService: EventStoreService,
    private readonly multichainConsumer: SensorMultiChainConsumer,
  ) {}

  async eventListener(eventStoreService, eventMessage) {
    const metaData = { originSync: true };
    const streamId = `sensor-${eventMessage.aggregateId}`;

    const event = {
      streamId,
      metadata: metaData,
      data: eventMessage,
      eventType: eventMessage.eventType,
    }

    await eventStoreService.createEvent(event);
  }

  async onModuleInit() {
    const callback = (message) => this.eventListener(this.eventStoreService, message);
    await this.multichainConsumer.listenerLoop(callback);
  }
}
