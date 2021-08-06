import { Module } from '@nestjs/common';
import { MultiChainConfig } from '../../multichain.config';
import { CheckpointModule } from '../checkpoint/checkpoint.module';
import { EventStore } from '../eventstore/event-store';
import { EventStoreModule } from '../eventstore/event-store.module';
import { MultiChainModule } from '../multichain/multichain.module';
import { LegalEntityEsController } from './controller/legal-entity.es.controller';
import { LegalEntityMultiChainController } from './controller/legal-entity.mc.controller';
import { ObservationGoalEsController } from './controller/observation-goal.es.controller';
import { ObservationGoalMultiChainController } from './controller/observation-goal.mc.controller';
import { SensorDeviceESController } from './controller/sensordevice.es.controller';
import { SensorDeviceMultiChainController } from './controller/sensordevice.mc.controller';
import { LegalEntityEsListener } from './processor/legal-entity.es.listener';
import { LegalEntityMultiChainConsumer } from './processor/legal-entity.mc.consumer';
import { LegalEntityMultiChainProducer } from './processor/legal-entity.mc.producer';
import { ObservationGoalEsListener } from './processor/observation-goal.es.listener';
import { ObservationGoalMultiChainConsumer } from './processor/observation-goal.mc.consumer';
import { ObservationGoalMultiChainProducer } from './processor/observation-goal.mc.producer';
import { SensorDeviceESListener } from './processor/sensordevice.es.listener';
import { SensorDeviceMultiChainConsumer } from './processor/sensordevice.mc.consumer';
import { SensorDeviceMultiChainProducer } from './processor/sensordevice.mc.producer';

@Module({
    imports: [CheckpointModule, EventStoreModule, MultiChainModule, CoreModule],
    controllers: [
        LegalEntityEsController,
        LegalEntityMultiChainController,
        ObservationGoalEsController,
        ObservationGoalMultiChainController,
        SensorDeviceESController,
        SensorDeviceMultiChainController,
    ],
    providers: [
        EventStore,
        MultiChainConfig,
        LegalEntityEsListener,
        ObservationGoalEsListener,
        SensorDeviceESListener,
        LegalEntityMultiChainConsumer,
        LegalEntityMultiChainProducer,
        ObservationGoalMultiChainConsumer,
        ObservationGoalMultiChainProducer,
        SensorDeviceMultiChainConsumer,
        SensorDeviceMultiChainProducer,
    ],
})
export class CoreModule {}
