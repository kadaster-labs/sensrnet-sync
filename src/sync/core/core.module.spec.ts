import { Test } from '@nestjs/testing';
import { EventStore } from '../eventstore/event-store';
import { MultiChainConfig } from '../../multichain.config';
import { OwnerESListener } from './processor/owner.es.listener';
import { SensorESListener } from './processor/sensor.es.listener';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { MultiChainService } from '../multichain/multichain.service';
import { OwnerESController } from './controller/owner.es.controller';
import { SensorESController } from './controller/sensor.es.controller';
import { OwnerMultiChainConsumer } from './processor/owner.mc.consumer';
import { OwnerMultiChainProducer } from './processor/owner.mc.producer';
import { SensorMultiChainConsumer } from './processor/sensor.mc.consumer';
import { SensorMultiChainProducer } from './processor/sensor.mc.producer';
import { OwnerMultiChainController } from './controller/owner.mc.controller';
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

const mockMultiChainService = {
}

describe('Core (integration)', () => {
  let moduleRef;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [
        OwnerESController,
        OwnerMultiChainController,
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
        OwnerESListener,
        SensorESListener,
        OwnerMultiChainConsumer,
        OwnerMultiChainProducer,
        SensorMultiChainConsumer,
        SensorMultiChainProducer,
      ],
    }).compile();
  });

  it(`Should open an es subscription`, async () => {
    const ownerController: OwnerESController = moduleRef.get(OwnerESController);

    let success;
    try {
      await ownerController.openEventStoreSubscription();
      success = true;
    } catch {
      success = false;
    }

    expect(success).toBeTruthy();
  });

  it(`Should not open an es subscription again`, async () => {
    const ownerController: OwnerESController = moduleRef.get(OwnerESController);

    let success;
    try {
      await ownerController.openEventStoreSubscription();
      await ownerController.openEventStoreSubscription();
      success = true;
    } catch {
      success = false;
    }

    expect(success).not.toBeTruthy();
  });
});
