import { EventMessage } from '../../../event-message';
import { DeviceRemoved as V1 } from './device-removed-v1.event';
export { DeviceRemoved } from './device-removed-v1.event';
export declare function getDeviceRemovedEvent(eventMessage: EventMessage): V1;
