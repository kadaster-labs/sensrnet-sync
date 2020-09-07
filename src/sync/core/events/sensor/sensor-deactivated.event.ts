import { Exclude } from 'class-transformer';
import { SensorEvent } from './sensor.event';

@Exclude()
export class SensorDeactivated extends SensorEvent {
  constructor(sensorId: string) {
    super(sensorId);
  }
}
