import { SensorDeviceEvent } from '../../sensordevice.event';
export declare class DeviceLocatedAtBaseObject extends SensorDeviceEvent {
    static version: string;
    readonly name: string;
    readonly description: string;
    readonly location: number[];
    readonly baseObjectId: string;
    constructor(deviceId: string, name: string, description: string, location: number[], baseObjectId: string);
}
