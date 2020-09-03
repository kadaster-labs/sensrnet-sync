import { Injectable, OnModuleInit } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { Event } from '../events/event';
import { plainToClass } from 'class-transformer';
import { ownerEventType } from '../events/owner';
import { EventStore } from '../../eventstore/event-store';
import { AbstractMsConsumer } from './abstract.ms.consumer';

@Injectable()
export class OwnerMultiChainConsumer extends AbstractMsConsumer implements OnModuleInit {

  constructor(
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
    multichainService: MultiChainService,
  ) {
    super('owners', 'sync-owner-multichain',
      eventStoreService, checkpointService, multichainService);
  }

  async publishToEventStore(eventMessage: Event): Promise<void> {
    const event: Event = plainToClass(ownerEventType.getType(eventMessage.eventType), eventMessage);
    return await this.eventStoreService.createEvent(event.toEventMessage());
  };

  async onModuleInit(): Promise<void> {
    await this.listenerLoop();
  }

}
