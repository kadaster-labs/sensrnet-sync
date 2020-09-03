import { SensorEvent } from './sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DatastreamDeleted extends SensorEvent {

  @Expose()
  readonly dataStreamId: string;

  constructor(sensorId: string, dataStreamId: string) {
    super(sensorId);
    this.dataStreamId = dataStreamId;
  }
}
