import { SensorEvent } from './sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorRegistered extends SensorEvent {

  @Expose()
  readonly ownerId: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly longitude: number;

  @Expose()
  readonly latitude: number;

  @Expose()
  readonly height: number;

  @Expose()
  readonly baseObjectId: string;

  @Expose()
  readonly aim: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly manufacturer: string;

  @Expose()
  readonly active: boolean;

  @Expose()
  readonly observationArea: object;

  @Expose()
  readonly documentationUrl: string;

  @Expose()
  readonly theme: string[];

  @Expose()
  readonly typeName: string;

  @Expose()
  readonly typeDetails: object;

  constructor(sensorId: string, ownerId: string,
              name: string, longitude: number, latitude: number, height: number,
              baseObjectId: string, aim: string, description: string,
              manufacturer: string, active: boolean, observationArea: object,
              documentationUrl: string, theme: string[], typeName: string,
              typeDetails: object) {
    super(sensorId);
    this.ownerId = ownerId;
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;
    this.height = height;
    this.baseObjectId = baseObjectId;
    this.aim = aim;
    this.description = description;
    this.manufacturer = manufacturer;
    this.active = active;
    this.observationArea = observationArea;
    this.documentationUrl = documentationUrl;
    this.theme = theme;
    this.typeName = typeName;
    this.typeDetails = typeDetails;
  }
}
