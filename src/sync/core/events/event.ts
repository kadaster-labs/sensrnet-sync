import { EventMessage } from './event-message';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class Event {

  @Expose()
  public readonly nodeId: string;

  @Expose()
  public readonly aggregateId: string;

  @Expose()
  public readonly eventType: string;

  protected constructor(aggregateId: string) {
    this.aggregateId = aggregateId;
  }

  abstract streamRoot(): string;

  @Expose()
  toEventMessage(): EventMessage {
    return new EventMessage(
      `${this.streamRoot()}-${this.aggregateId}`,
      this.constructor.name,
      this,
      { originSync: true },
    );
  }
}
