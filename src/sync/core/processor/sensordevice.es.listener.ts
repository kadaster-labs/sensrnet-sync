import { Injectable } from '@nestjs/common';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { sensorDeviceEventType, sensorDeviceStreamRootValue } from '../events/sensordevice';
import { AbstractESListener } from './abstract.es.listener';
import { SensorDeviceMultiChainProducer } from './sensordevice.mc.producer';

@Injectable()
export class SensorDeviceESListener extends AbstractESListener {
  constructor(
    multichainProducer: SensorDeviceMultiChainProducer,
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
  ) {
    super(`$ce-${sensorDeviceStreamRootValue}`, `sync-${sensorDeviceStreamRootValue}-es`, sensorDeviceEventType, eventStoreService, checkpointService,
      multichainProducer);
  }

}
