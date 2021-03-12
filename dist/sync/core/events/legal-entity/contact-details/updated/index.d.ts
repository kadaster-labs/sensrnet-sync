import { EventMessage } from '../../../event-message';
import { ContactDetailsUpdated as V1 } from './contact-details-updated-v1.event';
export { ContactDetailsUpdated as ContactDetailsUpdated } from './contact-details-updated-v1.event';
export declare function getContactDetailsUpdatedEvent(eventMessage: EventMessage): V1;
