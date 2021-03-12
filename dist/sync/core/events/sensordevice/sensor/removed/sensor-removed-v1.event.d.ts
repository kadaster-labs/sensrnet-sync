import { SensorDeviceEvent } from '../../sensordevice.event';
export declare class SensorRemoved extends SensorDeviceEvent {
    static version: string;
    readonly sensorId: string;
    constructor(deviceId: string, sensorId: string);
}
