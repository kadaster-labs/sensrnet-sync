import { Exclude, Expose } from 'class-transformer';
import { SensorDeviceEvent } from '../../sensordevice.event';

@Exclude()
export class DatastreamRemoved extends SensorDeviceEvent {
    static version = '1';

    @Expose()
    public readonly datastreamId: string;

    constructor(sensorDeviceId: string, datastreamId: string) {
        super(sensorDeviceId, DatastreamRemoved.version);
        this.datastreamId = datastreamId;
    }
}
