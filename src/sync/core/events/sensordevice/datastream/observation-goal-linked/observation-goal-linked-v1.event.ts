import { Exclude, Expose } from 'class-transformer';
import { SensorDeviceEvent } from '../../sensordevice.event';

@Exclude()
export class ObservationGoalLinked extends SensorDeviceEvent {

    static version = '1';

    @Expose()
    readonly sensorId: string;

    @Expose()
    readonly legalEntityId: string;

    @Expose()
    readonly dataStreamId: string;

    @Expose()
    readonly observationGoalId: string;

    constructor(sensorDeviceId: string, sensorId: string, legalEntityId: string, datastreamId: string,
        observationGoalId: string) {
        super(sensorDeviceId, ObservationGoalLinked.version);
        this.sensorId = sensorId;
        this.legalEntityId = legalEntityId;
        this.dataStreamId = datastreamId;
        this.observationGoalId = observationGoalId;
    }

}