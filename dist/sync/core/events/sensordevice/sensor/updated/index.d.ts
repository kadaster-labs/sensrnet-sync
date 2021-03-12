import { EventMessage } from '../../../event-message';
import { SensorUpdated as V1 } from './sensor-updated-v1.event';
export { SensorUpdated } from './sensor-updated-v1.event';
export declare function getSensorUpdatedEvent(eventMessage: EventMessage): V1;
