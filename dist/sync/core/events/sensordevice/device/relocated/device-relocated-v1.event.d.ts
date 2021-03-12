import { SensorDeviceEvent } from '../../sensordevice.event';
export declare class DeviceRelocated extends SensorDeviceEvent {
    static version: string;
    readonly name: string;
    readonly description: string;
    readonly location: number[];
    constructor(deviceId: string, name: string, description: string, location: number[]);
}
