import { plainToClass } from 'class-transformer';
import { EventMessage } from '../../../event-message';
import { DatastreamUpdated as V1 } from './datastream-updated-v1.event';

export { DatastreamUpdated } from './datastream-updated-v1.event';

export function getDatastreamUpdatedEvent(eventMessage: EventMessage): V1 {
    return !eventMessage.metadata.version || eventMessage.metadata.version === V1.version ? plainToClass(V1, eventMessage.data) : null;
}
