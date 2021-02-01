import { Exclude } from 'class-transformer';
import { SensorEvent } from '../../sensor.event';

@Exclude()
export class SensorDeactivated extends SensorEvent {

  static version = '1.0.0';

  public readonly version = SensorDeactivated.version;

  constructor(sensorId: string) {
    super(sensorId);
  }
}
