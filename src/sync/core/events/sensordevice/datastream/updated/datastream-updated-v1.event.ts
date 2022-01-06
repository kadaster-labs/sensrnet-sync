import { Exclude, Expose } from 'class-transformer';
import { DatastreamUpdatedBase } from './datastream-updated-base.event';

@Exclude()
export class DatastreamUpdated extends DatastreamUpdatedBase {
    static version = '1';

    @Expose() readonly observationArea: Record<string, any>;

    constructor(
        sensorDeviceId: string,
        sensorId: string,
        legalEntityId: string,
        datastreamId: string,
        name: string,
        description: string,
        unitOfMeasurement: Record<string, any>,
        observationArea: Record<string, any>,
        theme: string[],
        dataQuality: string,
        isActive: boolean,
        isPublic: boolean,
        isOpenData: boolean,
        containsPersonalInfoData: boolean,
        isReusable: boolean,
        documentation: string,
        dataLink: string,
    ) {
        super(
            sensorDeviceId,
            sensorId,
            legalEntityId,
            datastreamId,
            name,
            description,
            unitOfMeasurement,
            theme,
            dataQuality,
            isActive,
            isPublic,
            isOpenData,
            containsPersonalInfoData,
            isReusable,
            documentation,
            dataLink,
            DatastreamUpdated.version,
        );
        this.observationArea = observationArea;
    }
}
