import { SensorDeviceEvent } from '../../sensordevice.event';
export declare class DeviceRegistered extends SensorDeviceEvent {
    static version: string;
    readonly legalEntityId: string;
    readonly name: string;
    readonly description: string;
    readonly category: string;
    readonly connectivity: string;
    constructor(deviceId: string, legalEntityId: string, name: string, description: string, category: string, connectivity: string);
}
