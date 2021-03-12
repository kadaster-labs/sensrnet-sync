import { SensorDeviceEvent } from '../../sensordevice.event';
export declare class DeviceRemoved extends SensorDeviceEvent {
    static version: string;
    readonly legalEntityId: string;
    constructor(deviceId: string, legalEntityId: string);
}
