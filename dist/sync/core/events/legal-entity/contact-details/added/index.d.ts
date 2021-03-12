import { EventMessage } from '../../../event-message';
import { PublicContactDetailsAdded as PublicV1 } from './public-contact-details-added-v1.event';
export { PublicContactDetailsAdded as PublicContactDetailsAdded } from './public-contact-details-added-v1.event';
export declare function getPublicContactDetailsAddedEvent(eventMessage: EventMessage): PublicV1;
