import { Exclude, Expose } from 'class-transformer';
import { SensorDeviceEvent } from '../../sensordevice.event';

@Exclude()
export class ObservationGoalUnlinked extends SensorDeviceEvent {
    static version = '1';

    @Expose()
    readonly sensorId: string;

    @Expose()
    readonly legalEntityId: string;

    @Expose()
    readonly datastreamId: string;

    @Expose()
    readonly observationGoalId: string;

    constructor(
        sensorDeviceId: string,
        sensorId: string,
        legalEntityId: string,
        datastreamId: string,
        observationGoalId: string,
    ) {
        super(sensorDeviceId, ObservationGoalUnlinked.version);
        this.sensorId = sensorId;
        this.legalEntityId = legalEntityId;
        this.datastreamId = datastreamId;
        this.observationGoalId = observationGoalId;
    }
}
