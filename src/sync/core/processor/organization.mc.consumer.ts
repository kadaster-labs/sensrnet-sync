import { Injectable, OnModuleInit } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { Event } from '../events/event';
import { plainToClass } from 'class-transformer';
import { organizationEventType } from '../events/organization';
import { EventStore } from '../../eventstore/event-store';
import { AbstractMsConsumer } from './abstract.mc.consumer';

@Injectable()
export class OrganizationMultiChainConsumer extends AbstractMsConsumer implements OnModuleInit {
  constructor(
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
    multichainService: MultiChainService,
  ) {
    super('organizations', 'sync-organization-multichain',
      eventStoreService, checkpointService, multichainService);
  }

  async publishToEventStore(eventMessage: Event): Promise<void> {
    const event: Event = plainToClass(organizationEventType.getType(eventMessage.eventType), eventMessage);
    return await this.eventStoreService.createEvent(event.toEventMessage());
  }

  async onModuleInit(): Promise<void> {
    await this.listenerLoop();
  }

}
