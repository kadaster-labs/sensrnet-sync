import { SensorEvent } from '../../sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorRelocated extends SensorEvent {

  static version = '1.0.1';

  public readonly version = SensorRelocated.version;

  @Expose()
  readonly location: number[];

  @Expose()
  readonly baseObjectId: string;

  constructor(sensorId: string, location: number[], baseObjectId: string) {
    super(sensorId);
    this.location = location;
    this.baseObjectId = baseObjectId;
  }
}
