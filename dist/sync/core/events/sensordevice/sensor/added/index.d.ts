import { EventMessage } from '../../../event-message';
import { SensorAdded as V1 } from './sensor-added-v1.event';
export { SensorAdded } from './sensor-added-v1.event';
export declare function getSensorAddedEvent(eventMessage: EventMessage): V1;
