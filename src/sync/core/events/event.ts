import { EventMessage } from './event-message';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class Event {

  public readonly version: string;

  @Expose()
  public readonly aggregateId: string;

  @Expose()
  public readonly eventType: string;

  protected constructor(aggregateId: string, version: string) {
    this.aggregateId = aggregateId;
    this.version = version;
  }

  abstract streamRoot(): string;

  @Expose()
  toEventMessage(): EventMessage {
    const { version, ...eventData } = this;

    return new EventMessage(
      `${this.streamRoot()}-${this.aggregateId}`,
      this.constructor.name,
      eventData,
      {version, originSync: true},
    );
  }
}
