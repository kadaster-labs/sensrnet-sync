import { AbstractEventType } from '../abstract-event-type';
import { ContactDetailsRemoved, ContactDetailsUpdated, getContactDetailsRemovedEvent, getContactDetailsUpdatedEvent, getPublicContactDetailsAddedEvent, PublicContactDetailsAdded } from './contact-details';
import { getOrganizationRegisteredEvent, OrganizationRegistered } from './organization/registered';
import { getOrganizationUpdatedEvent, OrganizationUpdated } from './organization/updated';
import { getOrganizationDeletedEvent, OrganizationDeleted } from './removed';

class LegalEntityEventType extends AbstractEventType {
  constructor() {
    super();

    this.add(OrganizationRegistered, getOrganizationRegisteredEvent);
    this.add(OrganizationUpdated, getOrganizationUpdatedEvent);
    this.add(OrganizationDeleted, getOrganizationDeletedEvent);

    this.add(PublicContactDetailsAdded, getPublicContactDetailsAddedEvent);
    this.add(ContactDetailsUpdated, getContactDetailsUpdatedEvent);
    this.add(ContactDetailsRemoved, getContactDetailsRemovedEvent);
  }
}

export const legalEntityEventType = new LegalEntityEventType();
