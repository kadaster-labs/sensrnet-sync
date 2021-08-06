import { Exclude, Expose } from 'class-transformer';
import { SensorDeviceEvent } from '../../sensordevice.event';

@Exclude()
export class DatastreamRemoved extends SensorDeviceEvent {
    static version = '1';

    @Expose()
    public readonly dataStreamId: string;

    constructor(sensorDeviceId: string, dataStreamId: string) {
        super(sensorDeviceId, DatastreamRemoved.version);
        this.dataStreamId = dataStreamId;
    }
}
