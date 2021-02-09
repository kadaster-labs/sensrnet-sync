import { SensorEvent } from '../sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorRegistered extends SensorEvent {

  static version = '2';

  @Expose()
  readonly organizationId: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly location: number[];

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

  constructor(sensorId: string, organizationId: string, name: string,
              location: number[], baseObjectId: string, aim: string,
              description: string, manufacturer: string, active: boolean,
              observationArea: Record<string, any>, documentationUrl: string,
              theme: string[], category: string, typeName: string,
              typeDetails: Record<string, any>) {
    super(sensorId, SensorRegistered.version);

    this.organizationId = organizationId;
    this.name = name;
    this.location = location;
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
