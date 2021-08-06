import { Exclude, Expose } from 'class-transformer';
import { SensorDeviceEvent } from '../../sensordevice.event';

@Exclude()
export class DeviceLocated extends SensorDeviceEvent {
    static version = '1';

    @Expose() readonly name: string;
    @Expose() readonly description: string;
    @Expose() readonly location: number[];

    constructor(deviceId: string, name: string, description: string, location: number[]) {
        super(deviceId, DeviceLocated.version);

        this.name = name;
        this.description = description;
        this.location = location;
    }
}
