import { SensorEvent } from '../../sensor.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DatastreamDeleted extends SensorEvent {

  static version = '1.0.0';

  public readonly version = DatastreamDeleted.version;

  @Expose()
  readonly dataStreamId: string;

  constructor(sensorId: string, dataStreamId: string) {
    super(sensorId);
    this.dataStreamId = dataStreamId;
  }
}
