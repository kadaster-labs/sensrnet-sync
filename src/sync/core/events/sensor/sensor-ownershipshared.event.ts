import { SensorEvent } from './sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorOwnershipShared extends SensorEvent {
  @Expose()
  public readonly organizationId: string;

  constructor(sensorId: string, organizationId: string) {
    super(sensorId);
    this.organizationId = organizationId;
  }
}
