import { plainToClass } from 'class-transformer';
import { EventMessage } from '../../event-message';
import { SensorDeleted as V1 } from './1.0.0/sensor-deleted.event';

export { SensorDeleted } from './1.0.0/sensor-deleted.event';

export function getSensorDeletedEvent(eventMessage: EventMessage): V1 {
    return plainToClass(V1, eventMessage.data);
}

