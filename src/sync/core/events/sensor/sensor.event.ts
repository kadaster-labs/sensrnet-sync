import { Event } from '../event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class SensorEvent extends Event {

  @Expose()
  readonly sensorId: string;

  protected constructor(sensorId: string, version: string) {
    super(sensorId, version);

    this.sensorId = sensorId;
  }

  @Expose()
  streamRoot(): string {
    return 'sensor';
  }
}
