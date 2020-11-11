import { organizationEventType } from '../events/organization';
import { OrganizationMultiChainProducer } from './organization.mc.producer';
import { Injectable } from '@nestjs/common';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { AbstractESListener } from './abstract.es.listener';

@Injectable()
export class OrganizationEsListener extends AbstractESListener {
  constructor(
    multichainProducer: OrganizationMultiChainProducer,
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
  ) {
    super('$ce-organization', 'sync-organization-es', organizationEventType, eventStoreService,
      checkpointService, multichainProducer);
  }
}
