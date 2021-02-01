import { plainToClass } from 'class-transformer';
import { EventMessage } from '../../event-message';
import { SensorUpdated as V1 } from './1.0.0/sensor-updated.event';

export { SensorUpdated } from './1.0.0/sensor-updated.event';

export function getSensorUpdatedEvent(eventMessage: EventMessage): V1 {
    return plainToClass(V1, eventMessage.data);
}

