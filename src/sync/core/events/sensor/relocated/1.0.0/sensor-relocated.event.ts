import { SensorEvent } from '../../sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorRelocated extends SensorEvent {

  static version = '1.0.0';

  @Expose()
  readonly longitude: number;

  @Expose()
  readonly latitude: number;

  @Expose()
  readonly height: number;

  @Expose()
  readonly baseObjectId: string;

  constructor(sensorId: string, longitude: number, latitude: number, height: number, baseObjectId: string) {
    super(sensorId, SensorRelocated.version);

    this.longitude = longitude;
    this.latitude = latitude;
    this.height = height;
    this.baseObjectId = baseObjectId;
  }
}
