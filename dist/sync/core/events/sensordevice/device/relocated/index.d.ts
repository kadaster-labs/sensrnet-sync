import { EventMessage } from '../../../event-message';
import { DeviceRelocated as V1 } from './device-relocated-v1.event';
export { DeviceRelocated } from './device-relocated-v1.event';
export declare function getDeviceRelocatedEvent(eventMessage: EventMessage): V1;
