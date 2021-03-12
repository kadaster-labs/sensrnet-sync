import { SensorDeviceEvent } from '../../sensordevice.event';
export declare class DatastreamRemoved extends SensorDeviceEvent {
    static version: string;
    readonly dataStreamId: string;
    constructor(sensorDeviceId: string, dataStreamId: string);
}
