import { Exclude, Expose } from 'class-transformer';
import { DatastreamBase } from '../datastream-base.event';

@Exclude()
export class DatastreamUpdated extends DatastreamBase {
    static version = '2';

    @Expose() readonly observedArea: Record<string, any>;

    constructor(
        sensorDeviceId: string,
        sensorId: string,
        legalEntityId: string,
        datastreamId: string,
        name: string,
        description: string,
        unitOfMeasurement: Record<string, any>,
        observedArea: Record<string, any>,
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
        this.observedArea = observedArea;
    }
}
