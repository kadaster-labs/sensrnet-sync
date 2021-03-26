import { Exclude, Expose } from 'class-transformer';
import { SensorDeviceEvent}  from '../../sensordevice.event';

@Exclude()
export class SensorUpdated extends SensorDeviceEvent {
  static version = '1';

  @Expose() readonly sensorId: string;
  @Expose() readonly legalEntityId: string;
  @Expose() readonly name: string;
  @Expose() readonly description: string;
  @Expose() readonly type: string;
  @Expose() readonly manufacturer: string;
  @Expose() readonly supplier: string;
  @Expose() readonly documentation: string;

  constructor(deviceId: string, sensorId: string, legalEntityId: string, name: string, description: string,
    type: string, manufacturer: string, supplier: string, documentation: string) {
    super(deviceId, SensorUpdated.version);
    this.sensorId = sensorId;
    this.legalEntityId = legalEntityId;
    this.name = name;
    this.description = description;
    this.type = type;
    this.manufacturer = manufacturer;
    this.supplier = supplier;
    this.documentation = documentation;
  }
}
