import { Exclude, Expose } from 'class-transformer';
import { SensorDeviceEvent}  from '../../sensordevice.event';

@Exclude()
export class DeviceRegistered extends SensorDeviceEvent {
  static version = '1';

  @Expose() readonly legalEntityId: string;
  @Expose() readonly name: string;
  @Expose() readonly description: string;
  @Expose() readonly category: string;
  @Expose() readonly connectivity: string;

  constructor(deviceId: string, legalEntityId: string, name: string, description: string,
              category: string, connectivity: string) {
    super(deviceId, DeviceRegistered.version);

    this.legalEntityId = legalEntityId;
    this.name = name;
    this.description = description;
    this.category = category;
    this.connectivity = connectivity;
  }
}
