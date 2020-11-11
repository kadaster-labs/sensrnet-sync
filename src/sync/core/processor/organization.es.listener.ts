import { Event } from '../events/event';
import { plainToClass } from 'class-transformer';
import { organizationEventType } from '../events/organization';
import { OrganizationMultiChainProducer } from './organization.mc.producer';
import { Injectable } from '@nestjs/common';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { SubscriptionExistsException } from '../errors/subscription-exists-exception';
import { AbstractESListener } from './abstract.es.listener';

@Injectable()
export class OrganizationEsListener extends AbstractESListener {

  constructor(
    private readonly multichainProducer: OrganizationMultiChainProducer,
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
  ) {
    super('sync-organization-es', eventStoreService, checkpointService);
  }

  async openSubscription(): Promise<void> {
    if (!this.subscriptionExists()) {
      const onEvent = async (_, eventMessage) => {
        const conditions = { _id: this.checkpointId };
        const update = { offset: eventMessage.positionEventNumber };
        const callback = async () => this.checkpointService.updateOne(conditions, update);

        if (!eventMessage['metadata'] || !eventMessage['metadata'].originSync) {
          const { nodeId, organizationId, aggregateId, contactPhone, contactEmail } = eventMessage.data;
          const eventMessageFormatted = { nodeId, organizationId, aggregateId, contactEmail,
            contactPhone, eventType: eventMessage.eventType };
          const eventType = organizationEventType.getType(eventMessage.eventType);

          if (eventType) {
            const event: Event = plainToClass(eventType, eventMessageFormatted);
            await this.multichainProducer.publishEvent(event);
          }
        }
        await callback();
      };

      await this.subscribeToStreamFrom('$ce-organization', this.checkpointId, onEvent);
    } else {
      throw new SubscriptionExistsException();
    }
  }

}
