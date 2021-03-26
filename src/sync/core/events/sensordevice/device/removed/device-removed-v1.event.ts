import { Exclude, Expose } from 'class-transformer';
import { SensorDeviceEvent } from '../../sensordevice.event';

@Exclude()
export class DeviceRemoved extends SensorDeviceEvent {

  static version = '1';

  @Expose()
  readonly legalEntityId: string;

  constructor(deviceId: string, legalEntityId: string) {
    super(deviceId, DeviceRemoved.version);
    this.legalEntityId = legalEntityId;
  }
}
