import { AbstractEventType } from '../abstract-event-type';
import { getOrganizationRegisteredEvent, OrganizationRegistered } from './organization/registered';
import { getOrganizationUpdatedEvent, OrganizationUpdated } from './organization/updated';
import { getOrganizationDeletedEvent, OrganizationDeleted } from './removed';

class LegalEntityEventType extends AbstractEventType {
  constructor() {
    super();

    this.add(OrganizationRegistered, getOrganizationRegisteredEvent);
    this.add(OrganizationUpdated, getOrganizationUpdatedEvent);
    this.add(OrganizationDeleted, getOrganizationDeletedEvent);
  }
}

export const legalEntityEventType = new LegalEntityEventType();
