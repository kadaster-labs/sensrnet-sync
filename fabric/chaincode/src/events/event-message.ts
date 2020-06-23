import {Event} from './event';
import {v4 as uuidv4} from 'uuid';

export class EventMessage {
  public readonly messageId: string;
  public readonly eventType: string;
  public readonly data: object = {};
  public readonly metadata: object = {};

  protected constructor(
    messageId: string,
    eventType: string,
    data: object = {},
    metadata: object = {},
  ) {
    this.messageId = messageId;
    this.eventType = eventType;
    this.data = data;
    this.metadata = metadata;
  }

  static fromEvent(event: Event, metadata: object = {}): EventMessage {
    return new this(
      uuidv4(),
      event.constructor.name,
      event,
      metadata,
    );
  }

  static fromPayload(payload: object, eventType: string, metadata: object = {}): EventMessage {
    return new this(
      uuidv4(),
      eventType,
      payload,
      metadata,
    );
  }

}
