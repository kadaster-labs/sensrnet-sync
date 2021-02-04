import { plainToClass } from 'class-transformer';
import { EventMessage } from '../../event-message';
import { SensorActivated as V1 } from './1.0.0/sensor-activated.event';

export { SensorActivated } from './1.0.0/sensor-activated.event';

export function getSensorActivatedEvent(eventMessage: EventMessage): V1 {
    return !eventMessage.metadata.version || eventMessage.metadata.version === V1.version ? plainToClass(V1, eventMessage.data) : null;
}
