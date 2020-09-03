import { Injectable, OnModuleInit } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { Event } from '../events/event';
import { plainToClass } from 'class-transformer';
import { sensorEventType } from '../events/sensor';
import { EventStore } from '../../eventstore/event-store';
import { AbstractMsConsumer } from './abstract.ms.consumer';

@Injectable()
export class SensorMultiChainConsumer extends AbstractMsConsumer implements OnModuleInit {

  constructor(
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
    multichainService: MultiChainService,
  ) {
    super('sensors', 'sync-sensor-multichain',
      eventStoreService, checkpointService, multichainService);
  }

  async publishToEventStore(eventMessage: Event): Promise<void> {
    const event: Event = plainToClass(sensorEventType.getType(eventMessage.eventType), eventMessage as Event);
    await this.eventStoreService.createEvent(event.toEventMessage());
  };

  async onModuleInit(): Promise<void> {
    await this.listenerLoop(this.publishToEventStore);
  }

}
