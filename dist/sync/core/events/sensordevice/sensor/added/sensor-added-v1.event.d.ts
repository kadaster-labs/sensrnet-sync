import { SensorDeviceEvent } from '../../sensordevice.event';
export declare class SensorAdded extends SensorDeviceEvent {
    static version: string;
    readonly sensorId: string;
    readonly legalEntityId: string;
    readonly name: string;
    readonly description: string;
    readonly type: string;
    readonly manufacturer: string;
    readonly supplier: string;
    readonly documentation: string;
    constructor(deviceId: string, sensorId: string, legalEntityId: string, name: string, description: string, type: string, manufacturer: string, supplier: string, documentation: string);
}
