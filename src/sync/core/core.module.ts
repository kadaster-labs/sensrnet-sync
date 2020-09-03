import { Module } from '@nestjs/common';
import { OwnerESController } from './controller/owner.es.controller';
import { CheckpointModule } from '../checkpoint/checkpoint.module';
import { EventStoreModule } from '../eventstore/event-store.module';
import { MultiChainModule } from '../multichain/multichain.module';
import { SensorESController } from './controller/sensor.es.controller';
import { OwnerMultiChainController } from './controller/owner.mc.controller';
import { SensorMultiChainController } from './controller/sensor.mc.controller';
import { EventStore } from '../eventstore/event-store';
import { SensorESListener } from './processor/sensor.es.listener';
import { MultichainConfig } from '../../multichain.config';
import { SensorMultiChainConsumer } from './processor/sensor.mc.consumer';
import { SensorMultiChainProducer } from './processor/sensor.mc.producer';
import { OwnerESListener } from './processor/owner.es.listener';
import { OwnerMultiChainConsumer } from './processor/owner.mc.consumer';
import { OwnerMultiChainProducer } from './processor/owner.mc.producer';
import { EventStoreConfiguration } from '../eventstore/event-store.configuration';

@Module({
  imports: [
    CheckpointModule,
    EventStoreModule,
    MultiChainModule,
    CoreModule,
  ],
  controllers: [
    OwnerESController,
    OwnerMultiChainController,
    SensorESController,
    SensorMultiChainController,
  ],
  providers: [
    EventStore,
    MultichainConfig,
    OwnerESListener,
    SensorESListener,
    OwnerMultiChainConsumer,
    OwnerMultiChainProducer,
    SensorMultiChainConsumer,
    SensorMultiChainProducer,
  ],
})

export class CoreModule {
}
