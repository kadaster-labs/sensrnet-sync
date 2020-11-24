import { Module } from '@nestjs/common';
import { OrganizationEsController } from './controller/organization.es.controller';
import { CheckpointModule } from '../checkpoint/checkpoint.module';
import { EventStoreModule } from '../eventstore/event-store.module';
import { MultiChainModule } from '../multichain/multichain.module';
import { SensorESController } from './controller/sensor.es.controller';
import { OrganizationMultiChainController } from './controller/organization.mc.controller';
import { SensorMultiChainController } from './controller/sensor.mc.controller';
import { EventStore } from '../eventstore/event-store';
import { SensorESListener } from './processor/sensor.es.listener';
import { MultiChainConfig } from '../../multichain.config';
import { SensorMultiChainConsumer } from './processor/sensor.mc.consumer';
import { SensorMultiChainProducer } from './processor/sensor.mc.producer';
import { OrganizationEsListener } from './processor/organization.es.listener';
import { OrganizationMultiChainConsumer } from './processor/organization.mc.consumer';
import { OrganizationMultiChainProducer } from './processor/organization.mc.producer';

@Module({
  imports: [
    CheckpointModule,
    EventStoreModule,
    MultiChainModule,
    CoreModule,
  ],
  controllers: [
    OrganizationEsController,
    OrganizationMultiChainController,
    SensorESController,
    SensorMultiChainController,
  ],
  providers: [
    EventStore,
    MultiChainConfig,
    OrganizationEsListener,
    SensorESListener,
    OrganizationMultiChainConsumer,
    OrganizationMultiChainProducer,
    SensorMultiChainConsumer,
    SensorMultiChainProducer,
  ],
})

export class CoreModule {
}
