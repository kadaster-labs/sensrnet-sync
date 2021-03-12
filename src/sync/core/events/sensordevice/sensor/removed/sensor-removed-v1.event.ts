import { Exclude, Expose } from 'class-transformer';
import { SensorDeviceEvent } from '../../sensordevice.event';

@Exclude()
export class SensorRemoved extends SensorDeviceEvent {
  static version = '1';

  @Expose() readonly sensorId: string;

  constructor(deviceId: string, sensorId: string) {
    super(deviceId, SensorRemoved.version);

    this.sensorId = sensorId;
  }
}
