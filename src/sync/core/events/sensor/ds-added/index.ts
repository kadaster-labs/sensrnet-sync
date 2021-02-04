import { plainToClass } from 'class-transformer';
import { EventMessage } from '../../event-message';
import { DatastreamAdded as V1 } from './1.0.0/sensor-datastreamadded.event';

export { DatastreamAdded } from './1.0.0/sensor-datastreamadded.event';

export function getDatastreamAddedEvent(eventMessage: EventMessage): V1 {
    return !eventMessage.metadata.version || eventMessage.metadata.version === V1.version ? plainToClass(V1, eventMessage.data) : null;
}
