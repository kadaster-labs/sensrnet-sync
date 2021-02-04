import { Exclude } from 'class-transformer';
import { SensorEvent } from '../../sensor.event';

@Exclude()
export class SensorActivated extends SensorEvent {

  static version = '1.0.0';

  constructor(sensorId: string) {
    super(sensorId, SensorActivated.version);
  }
}
