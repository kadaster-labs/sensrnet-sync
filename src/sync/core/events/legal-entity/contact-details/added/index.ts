import { plainToClass } from 'class-transformer';
import { EventMessage } from '../../../event-message';
import { PublicContactDetailsAdded as PublicV1 } from './public-contact-details-added-v1.event';

export { PublicContactDetailsAdded } from './public-contact-details-added-v1.event';

export function getPublicContactDetailsAddedEvent(eventMessage: EventMessage): PublicV1 {
    return !eventMessage.metadata.version || eventMessage.metadata.version === PublicV1.version
        ? plainToClass(PublicV1, eventMessage.data)
        : null;
}
