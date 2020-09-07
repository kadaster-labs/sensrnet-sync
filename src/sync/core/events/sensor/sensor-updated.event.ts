import { SensorEvent } from './sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorUpdated extends SensorEvent {

  @Expose()
  readonly name: string;

  @Expose()
  readonly aim: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly manufacturer: string;

  @Expose()
  readonly observationArea: Record<string, any>;

  @Expose()
  readonly documentationUrl: string;

  @Expose()
  readonly theme: string[];

  @Expose()
  readonly typeName: string;

  @Expose()
  readonly typeDetails: Record<string, any>;

  constructor(sensorId: string, name: string, aim: string, description: string, manufacturer: string,
              observationArea: Record<string, any>,
              documentationUrl: string, theme: string[], typeName: string,
              typeDetails: Record<string, any>) {
    super(sensorId);
    this.name = name;
    this.aim = aim;
    this.description = description;
    this.manufacturer = manufacturer;
    this.observationArea = observationArea;
    this.documentationUrl = documentationUrl;
    this.theme = theme;
    this.typeName = typeName;
    this.typeDetails = typeDetails;
  }
}
