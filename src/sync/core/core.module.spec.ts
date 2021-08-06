import { Test } from '@nestjs/testing';
import { MultiChainConfig } from '../../multichain.config';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { EventStore } from '../eventstore/event-store';
import { MultiChainService } from '../multichain/multichain.service';
import { LegalEntityEsController } from './controller/legal-entity.es.controller';
import { LegalEntityMultiChainController } from './controller/legal-entity.mc.controller';
import { SensorDeviceESController } from './controller/sensordevice.es.controller';
import { SensorDeviceMultiChainController } from './controller/sensordevice.mc.controller';
import { LegalEntityEsListener } from './processor/legal-entity.es.listener';
import { LegalEntityMultiChainConsumer } from './processor/legal-entity.mc.consumer';
import { LegalEntityMultiChainProducer } from './processor/legal-entity.mc.producer';
import { SensorDeviceESListener } from './processor/sensordevice.es.listener';
import { SensorDeviceMultiChainConsumer } from './processor/sensordevice.mc.consumer';
import { SensorDeviceMultiChainProducer } from './processor/sensordevice.mc.producer';

const mockEventStore = {
    exists: async () => true,
    getEvents: () => [],
    connect: (): void => void 0,
    subscribeToStreamFrom: async () => true,
};

const mockCheckpointService = {
    findOne: async () => undefined,
    updateOne: async () => true,
};

const mockMultiChainService = {};

describe('Core (integration)', () => {
    let moduleRef;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            controllers: [
                LegalEntityEsController,
                LegalEntityMultiChainController,
                SensorDeviceESController,
                SensorDeviceMultiChainController,
            ],
            providers: [
                {
                    provide: EventStore,
                    useValue: mockEventStore,
                },
                {
                    provide: CheckpointService,
                    useValue: mockCheckpointService,
                },
                {
                    provide: MultiChainService,
                    useValue: mockMultiChainService,
                },
                MultiChainConfig,
                LegalEntityEsListener,
                SensorDeviceESListener,
                LegalEntityMultiChainConsumer,
                LegalEntityMultiChainProducer,
                SensorDeviceMultiChainConsumer,
                SensorDeviceMultiChainProducer,
            ],
        }).compile();
    });

    it(`Should open an es subscription`, async () => {
        const organizationController: LegalEntityEsController = moduleRef.get(LegalEntityEsController);

        let success;
        try {
            await organizationController.openEventStoreSubscription();
            success = true;
        } catch {
            success = false;
        }

        expect(success).toBeTruthy();
    });

    it(`Should not open an es subscription again`, async () => {
        const organizationController: LegalEntityEsController = moduleRef.get(LegalEntityEsController);

        let success;
        try {
            await organizationController.openEventStoreSubscription();
            await organizationController.openEventStoreSubscription();
            success = true;
        } catch {
            success = false;
        }

        expect(success).not.toBeTruthy();
    });
});
