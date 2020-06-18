import { EventStore } from './event-store';
import { Injectable } from '@nestjs/common';
import {NewEvent, TCPWriteEventOptions, TCPWriteEventsOptions} from "geteventstore-promise";
import {EventMessage} from "./event-message";

@Injectable()
export class EventStorePublisher {
  constructor(private eventStore: EventStore) {
    this.eventStore.connect();
  }

  async createEvent(event, options?: TCPWriteEventOptions) {
    return await this.eventStore.createEvent(event, options);
  }

  async subscribeToStream(streamName: string, onEvent, onDropped) {
    return await this.eventStore.subscribeToStream(streamName, onEvent, onDropped);
  }
}
