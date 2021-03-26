import { Injectable } from '@nestjs/common';
import { Event as ESEvent } from 'geteventstore-promise';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { MultiChainService } from '../../multichain/multichain.service';
import { Event } from '../events/event';
import { legalEntityEventType, legalEntityStreamRootValue } from '../events/legal-entity';
import { AbstractMsConsumer } from './abstract.mc.consumer';

@Injectable()
export class LegalEntityMultiChainConsumer extends AbstractMsConsumer {

  constructor(
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
    multichainService: MultiChainService,
  ) {
    super(`${legalEntityStreamRootValue}`, `sync-${legalEntityStreamRootValue}-multichain`,
      eventStoreService, checkpointService, multichainService);
  }

  async publishToEventStore(eventMessage: ESEvent): Promise<void> {
    const event: Event = legalEntityEventType.getEvent(eventMessage);

    let result;
    if (event) {
      result = await this.eventStoreService.createEvent(event.toEventMessage());
    }

    return result;
  }

}
