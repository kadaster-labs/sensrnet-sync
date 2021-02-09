import { Injectable } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { Event } from '../events/event';
import { organizationEventType } from '../events/organization';
import { EventStore } from '../../eventstore/event-store';
import { AbstractMsConsumer } from './abstract.mc.consumer';
import { Event as ESEvent } from 'geteventstore-promise';

@Injectable()
export class OrganizationMultiChainConsumer extends AbstractMsConsumer {
  constructor(
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
    multichainService: MultiChainService,
  ) {
    super('organizations', 'sync-organization-multichain',
      eventStoreService, checkpointService, multichainService);
  }

  async publishToEventStore(eventMessage: ESEvent): Promise<void> {
    const event: Event = organizationEventType.getEvent(eventMessage);

    let result;
    if (event) {
      result = await this.eventStoreService.createEvent(event.toEventMessage());
    }

    return result;
  }
}
