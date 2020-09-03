import { SensorEvent } from './sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorOwnershipShared extends SensorEvent {

  @Expose()
  public readonly ownerIds: string[];

  constructor(sensorId: string, ownerIds: string[]) {
    super(sensorId);
    this.ownerIds = ownerIds;
  }
}
