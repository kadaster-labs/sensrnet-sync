import { SensorEvent } from '../../sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorOwnershipTransferred extends SensorEvent {

  static version = '1.0.0';

  public readonly version = SensorOwnershipTransferred.version;

  @Expose()
  public readonly oldOrganizationId: string;

  @Expose()
  public readonly newOrganizationId: string;

  constructor(sensorId: string, oldOrganizationId: string, newOrganizationId: string) {
    super(sensorId);
    this.oldOrganizationId = oldOrganizationId;
    this.newOrganizationId = newOrganizationId;
  }
}
