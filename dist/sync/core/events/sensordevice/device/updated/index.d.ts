import { EventMessage } from '../../../event-message';
import { DeviceUpdated as V1 } from './device-updated-v1.event';
export { DeviceUpdated } from './device-updated-v1.event';
export declare function getDeviceUpdatedEvent(eventMessage: EventMessage): V1;
