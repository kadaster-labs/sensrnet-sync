import { Exclude, Expose } from 'class-transformer';
import { SensorDeviceEvent } from '../../sensordevice.event';

@Exclude()
export class DatastreamUpdated extends SensorDeviceEvent {
    static version = '1';

    @Expose() readonly sensorId: string;
    @Expose() readonly legalEntityId: string;
    @Expose() readonly datastreamId: string;
    @Expose() readonly name: string;
    @Expose() readonly description: string;
    @Expose() readonly unitOfMeasurement: Record<string, any>;
    @Expose() readonly observationArea: Record<string, any>;
    @Expose() readonly theme: string[];
    @Expose() readonly dataQuality: string;
    @Expose() readonly isActive: boolean;
    @Expose() readonly isPublic: boolean;
    @Expose() readonly isOpenData: boolean;
    @Expose() readonly containsPersonalInfoData: boolean;
    @Expose() readonly isReusable: boolean;
    @Expose() readonly documentation: string;
    @Expose() readonly dataLink: string;

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
        super(sensorDeviceId, DatastreamUpdated.version);
        this.sensorId = sensorId;
        this.legalEntityId = legalEntityId;
        this.datastreamId = datastreamId;
        this.name = name;
        this.description = description;
        this.unitOfMeasurement = unitOfMeasurement;
        this.observationArea = observationArea;
        this.theme = theme;
        this.dataQuality = dataQuality;
        this.isActive = isActive;
        this.isPublic = isPublic;
        this.isOpenData = isOpenData;
        this.containsPersonalInfoData = containsPersonalInfoData;
        this.isReusable = isReusable;
        this.documentation = documentation;
        this.dataLink = dataLink;
    }
}
