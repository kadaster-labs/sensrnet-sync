import { Test } from '@nestjs/testing';
import { EventStore } from '../eventstore/event-store';
import { MultiChainConfig } from '../../multichain.config';
import { OrganizationEsListener } from './processor/organization.es.listener';
import { SensorESListener } from './processor/sensor.es.listener';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { MultiChainService } from '../multichain/multichain.service';
import { OrganizationEsController } from './controller/organization.es.controller';
import { SensorESController } from './controller/sensor.es.controller';
import { OrganizationMultiChainConsumer } from './processor/organization.mc.consumer';
import { OrganizationMultiChainProducer } from './processor/organization.mc.producer';
import { SensorMultiChainConsumer } from './processor/sensor.mc.consumer';
import { SensorMultiChainProducer } from './processor/sensor.mc.producer';
import { OrganizationMultiChainController } from './controller/organization.mc.controller';
import { SensorMultiChainController } from './controller/sensor.mc.controller';

const mockEventStore = {
  exists: async () => true,
  getEvents: () => [],
  connect: (): void => void 0,
  subscribeToStreamFrom: async () => true,
}

const mockCheckpointService = {
  findOne: async () => undefined,
  updateOne: async () => true,
}

const mockMultiChainService = {}

describe('Core (integration)', () => {
  let moduleRef;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [
        OrganizationEsController,
        OrganizationMultiChainController,
        SensorESController,
        SensorMultiChainController,
      ], providers: [
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
        OrganizationEsListener,
        SensorESListener,
        OrganizationMultiChainConsumer,
        OrganizationMultiChainProducer,
        SensorMultiChainConsumer,
        SensorMultiChainProducer,
      ],
    }).compile();
  });

  it(`Should open an es subscription`, async () => {
    const organizationController: OrganizationEsController = moduleRef.get(OrganizationEsController);

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
    const organizationController: OrganizationEsController = moduleRef.get(OrganizationEsController);

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
