import { EventMessage } from '../../../event-message';
import { DeviceRegistered as V1 } from './device-registered-v1.event';
export { DeviceRegistered } from './device-registered-v1.event';
export declare function getDeviceRegisteredEvent(eventMessage: EventMessage): V1;
