import { Event } from '../events/event';
import { Injectable } from '@nestjs/common';
import { sensorEventType } from '../events/sensor';
import { Event as ESEvent } from 'geteventstore-promise';
import { EventStore } from '../../eventstore/event-store';
import { AbstractMsConsumer } from './abstract.mc.consumer';
import { MultiChainService } from '../../multichain/multichain.service';
import { CheckpointService } from '../../checkpoint/checkpoint.service';

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

  async publishToEventStore(eventMessage: ESEvent): Promise<void> {
    const event: Event = sensorEventType.getEvent(eventMessage);

    let result;
    if (event) {
      result = await this.eventStoreService.createEvent(event.toEventMessage());
    }

    return result;
  }
}
