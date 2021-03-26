import { Exclude, Expose } from 'class-transformer';
import { SensorDeviceEvent } from '../../sensordevice.event';

@Exclude()
export class DeviceRelocatedAtBaseObject extends SensorDeviceEvent {

    static version = '1';

    @Expose()
    readonly name: string;

    @Expose()
    readonly description: string;

    @Expose()
    readonly location: number[];

    @Expose()
    readonly baseObjectId: string;

    constructor(deviceId: string, name: string, description: string, location: number[], baseObjectId: string) {
        super(deviceId, DeviceRelocatedAtBaseObject.version);

        this.name = name;
        this.description = description;
        this.location = location;
        this.baseObjectId = baseObjectId;
    }

}