import { Exclude } from 'class-transformer';
import { SensorEvent } from '../sensor.event';

@Exclude()
export class SensorDeleted extends SensorEvent {

  static version = '1';

  constructor(sensorId: string) {
    super(sensorId, SensorDeleted.version);
  }
}