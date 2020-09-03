import { Exclude } from 'class-transformer';
import { SensorEvent } from './sensor.event';

@Exclude()
export class SensorActivated extends SensorEvent {
  constructor(sensorId: string) {
    super(sensorId);
  }
}
