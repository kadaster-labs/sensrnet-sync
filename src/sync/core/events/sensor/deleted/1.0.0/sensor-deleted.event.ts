import { Exclude } from 'class-transformer';
import { SensorEvent } from '../../sensor.event';

@Exclude()
export class SensorDeleted extends SensorEvent {

  static version = '1.0.0';

  public readonly version = SensorDeleted.version;

  constructor(sensorId: string) {
    super(sensorId);
  }
}
