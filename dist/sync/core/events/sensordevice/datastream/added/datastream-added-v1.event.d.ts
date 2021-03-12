import { SensorDeviceEvent } from '../../sensordevice.event';
export declare class DatastreamAdded extends SensorDeviceEvent {
    static version: string;
    readonly sensorId: string;
    readonly legalEntityId: string;
    readonly dataStreamId: string;
    readonly name: string;
    readonly description: string;
    readonly unitOfMeasurement: Record<string, any>;
    readonly observationArea: Record<string, any>;
    readonly theme: string[];
    readonly dataQuality: string;
    readonly isActive: boolean;
    readonly isPublic: boolean;
    readonly isOpenData: boolean;
    readonly containsPersonalInfoData: boolean;
    readonly isReusable: boolean;
    readonly documentation: string;
    readonly dataLink: string;
    constructor(sensorDeviceId: string, sensorId: string, legalEntityId: string, dataStreamId: string, name: string, description: string, unitOfMeasurement: Record<string, any>, observationArea: Record<string, any>, theme: string[], dataQuality: string, isActive: boolean, isPublic: boolean, isOpenData: boolean, containsPersonalInfoData: boolean, isReusable: boolean, documentation: string, dataLink: string);
}
