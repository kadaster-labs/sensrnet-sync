import { SensorEvent } from './sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SensorOwnershipTransferred extends SensorEvent {

  @Expose()
  public readonly oldOwnerId: string;

  @Expose()
  public readonly newOwnerId: string;

  constructor(sensorId: string, oldOwnerId: string, newOwnerId: string) {
    super(sensorId);
    this.oldOwnerId = oldOwnerId;
    this.newOwnerId = newOwnerId;
  }
}
