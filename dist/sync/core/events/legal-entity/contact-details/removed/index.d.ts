import { EventMessage } from '../../../event-message';
import { ContactDetailsRemoved as V1 } from './contact-details-removed-v1.event';
export { ContactDetailsRemoved as ContactDetailsRemoved } from './contact-details-removed-v1.event';
export declare function getContactDetailsRemovedEvent(eventMessage: EventMessage): V1;
