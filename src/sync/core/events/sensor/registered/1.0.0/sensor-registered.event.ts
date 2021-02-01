import { SensorEvent } from '../../sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorRegistered extends SensorEvent {

  static version = '1.0.0';

  public readonly version = SensorRegistered.version;

  @Expose()
  readonly organizationId: string;

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
  readonly observationArea: Record<string, any>;

  @Expose()
  readonly documentationUrl: string;

  @Expose()
  readonly theme: string[];

  @Expose()
  readonly category: string;

  @Expose()
  readonly typeName: string;

  @Expose()
  readonly typeDetails: Record<string, any>;

  constructor(sensorId: string, organizationId: string,
              name: string, longitude: number, latitude: number, height: number,
              baseObjectId: string, aim: string, description: string,
              manufacturer: string, active: boolean, observationArea: Record<string, any>,
              documentationUrl: string, theme: string[], category: string,
              typeName: string, typeDetails: Record<string, any>) {
    super(sensorId);
    this.organizationId = organizationId;
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
    this.category = category;
    this.typeName = typeName;
    this.typeDetails = typeDetails;
  }
}
