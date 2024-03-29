import { plainToClass } from 'class-transformer';
import { EventMessage } from '../../../event-message';
import { ContactDetailsUpdated as V1 } from './contact-details-updated-v1.event';

export { ContactDetailsUpdated } from './contact-details-updated-v1.event';

export function getContactDetailsUpdatedEvent(eventMessage: EventMessage): V1 {
    return !eventMessage.metadata.version || eventMessage.metadata.version === V1.version
        ? plainToClass(V1, eventMessage.data)
        : null;
}
