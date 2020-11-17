import { Injectable } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { Event } from '../events/event';
import { plainToClass } from 'class-transformer';
import { sensorEventType } from '../events/sensor';
import { EventStore } from '../../eventstore/event-store';
import { AbstractMsConsumer } from './abstract.mc.consumer';

@Injectable()
export class SensorMultiChainConsumer extends AbstractMsConsumer {

  constructor(
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
    multichainService: MultiChainService,
  ) {
    super('sensors', 'sync-sensor-multichain',
      eventStoreService, checkpointService, multichainService);
  }

  async publishToEventStore(eventMessage: Event): Promise<void> {
    const event: Event = plainToClass(sensorEventType.getType(eventMessage.eventType), eventMessage);
    await this.eventStoreService.createEvent(event.toEventMessage());
  }
}
