import { EventMessage } from '../../../event-message';
import { SensorRemoved as V1 } from './sensor-removed-v1.event';
export { SensorRemoved } from './sensor-removed-v1.event';
export declare function getSensorRemovedEvent(eventMessage: EventMessage): V1;
