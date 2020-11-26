import { sensorEventType } from '../events/sensor';
import { SensorMultiChainProducer } from './sensor.mc.producer';
import { Injectable } from '@nestjs/common';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { AbstractESListener } from './abstract.es.listener';

@Injectable()
export class SensorESListener extends AbstractESListener {
  constructor(
    multichainProducer: SensorMultiChainProducer,
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
  ) {
    super('$ce-sensor', 'sync-sensor-es', sensorEventType, eventStoreService, checkpointService,
      multichainProducer);
  }
}
