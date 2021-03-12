import { Exclude, Expose } from 'class-transformer';
import { Event } from '../event';
import { sensorDeviceStreamRootValue } from './sensordevice.stream';

@Exclude()
export abstract class SensorDeviceEvent extends Event {

  static streamRootValue = sensorDeviceStreamRootValue;

  @Expose()
  readonly deviceId: string;

  protected constructor(sensorDeviceId: string, version: string) {
    super(sensorDeviceId, version);

    this.deviceId = sensorDeviceId;
  }

  @Expose()
  streamRoot(): string {
    return SensorDeviceEvent.streamRootValue;
  }

}
