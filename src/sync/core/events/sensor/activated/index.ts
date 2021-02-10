import { plainToClass } from 'class-transformer';
import { EventMessage } from '../../event-message';
import { SensorActivated as V1 } from './sensor-activated-v1.event';

export { SensorActivated } from './sensor-activated-v1.event';

export function getSensorActivatedEvent(eventMessage: EventMessage): V1 {
    return !eventMessage.metadata.version || eventMessage.metadata.version === V1.version ? plainToClass(V1, eventMessage.data) : null;
}