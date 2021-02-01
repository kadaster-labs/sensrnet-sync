import { SensorEvent } from '../../sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorOwnershipShared extends SensorEvent {

  static version = '1.0.0';

  public readonly version = SensorOwnershipShared.version;

  @Expose()
  public readonly organizationId: string;

  constructor(sensorId: string, organizationId: string) {
    super(sensorId);
    this.organizationId = organizationId;
  }
}
