import { Event } from '../event';
export declare abstract class SensorDeviceEvent extends Event {
    static streamRootValue: string;
    readonly deviceId: string;
    protected constructor(sensorDeviceId: string, version: string);
    streamRoot(): string;
}
