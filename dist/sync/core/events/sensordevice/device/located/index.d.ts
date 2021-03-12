import { EventMessage } from '../../../event-message';
import { DeviceLocated as V1 } from './device-located-v1.event';
export { DeviceLocated } from './device-located-v1.event';
export declare function getDeviceLocatedEvent(eventMessage: EventMessage): V1;
