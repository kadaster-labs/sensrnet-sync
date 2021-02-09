import { SensorEvent } from '../sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorRelocated extends SensorEvent {

  static version = '2';

  @Expose()
  readonly location: number[];

  @Expose()
  readonly baseObjectId: string;

  constructor(sensorId: string, location: number[], baseObjectId: string) {
    super(sensorId, SensorRelocated.version);

    this.location = location;
    this.baseObjectId = baseObjectId;
  }
}
