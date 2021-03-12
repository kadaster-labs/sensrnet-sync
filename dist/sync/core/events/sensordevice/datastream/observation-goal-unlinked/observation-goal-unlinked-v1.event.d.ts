import { SensorDeviceEvent } from '../../sensordevice.event';
export declare class ObservationGoalUnlinked extends SensorDeviceEvent {
    static version: string;
    readonly sensorId: string;
    readonly legalEntityId: string;
    readonly dataStreamId: string;
    readonly observationGoalId: string;
    constructor(sensorDeviceId: string, sensorId: string, legalEntityId: string, datastreamId: string, observationGoalId: string);
}
