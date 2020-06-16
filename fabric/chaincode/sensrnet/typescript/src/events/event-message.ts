import {Event} from './event';

export class EventMessage {
  public readonly streamId: string;
  public readonly eventType: string;
  public readonly data: object = {};
  public readonly metadata: object = {};

  protected constructor(
    streamId: string,
    eventType: string,
    data: object = {},
    metadata: object = {},
  ) {
    this.streamId = streamId;
    this.eventType = eventType;
    this.data = data;
    this.metadata = metadata;
  }

  static fromEvent(event: Event, metadata: object = {}): EventMessage {
    return new this(
      `${event.streamRoot()}-${event.aggregateId}`,
      event.constructor.name,
      event,
      metadata,
    );
  }

}
