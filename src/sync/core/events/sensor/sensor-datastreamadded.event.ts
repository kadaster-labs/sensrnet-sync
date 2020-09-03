import { SensorEvent } from './sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DatastreamAdded extends SensorEvent {

  @Expose()
  public readonly dataStreamId: string;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly reason: string;

  @Expose()
  public readonly description: string;

  @Expose()
  public readonly observedProperty: string;

  @Expose()
  public readonly unitOfMeasurement: string;

  @Expose()
  public readonly isPublic: boolean;

  @Expose()
  public readonly isOpenData: boolean;

  @Expose()
  public readonly isReusable: boolean;

  @Expose()
  public readonly documentationUrl: string;

  @Expose()
  public readonly dataLink: string;

  @Expose()
  public readonly dataFrequency: number;

  @Expose()
  public readonly dataQuality: number;

  constructor(sensorId: string, dataStreamId: string, name: string, reason: string, description: string,
              observedProperty: string, unitOfMeasurement: string, isPublic: boolean, isOpenData: boolean,
              isReusable: boolean, documentationUrl: string, dataLink: string,
              dataFrequency: number, dataQuality: number) {
    super(sensorId);
    this.dataStreamId = dataStreamId;
    this.name = name;
    this.reason = reason;
    this.description = description;
    this.observedProperty = observedProperty;
    this.unitOfMeasurement = unitOfMeasurement;
    this.isPublic = isPublic;
    this.isOpenData = isOpenData;
    this.isReusable = isReusable;
    this.documentationUrl = documentationUrl;
    this.dataLink = dataLink;
    this.dataFrequency = dataFrequency;
    this.dataQuality = dataQuality;
  }
}
