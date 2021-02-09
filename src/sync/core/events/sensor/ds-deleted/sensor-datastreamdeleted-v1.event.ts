import { SensorEvent } from '../sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DatastreamDeleted extends SensorEvent {

  static version = '1';

  @Expose()
  readonly dataStreamId: string;

  constructor(sensorId: string, dataStreamId: string) {
    super(sensorId, DatastreamDeleted.version);

    this.dataStreamId = dataStreamId;
  }
}
