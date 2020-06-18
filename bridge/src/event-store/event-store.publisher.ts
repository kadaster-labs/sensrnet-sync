import { EventStore } from './event-store';
import { Injectable } from '@nestjs/common';
import {NewEvent, TCPWriteEventsOptions} from "geteventstore-promise";

@Injectable()
export class EventStorePublisher {
  constructor(private eventStore: EventStore) {
    this.eventStore.connect();
  }

  async writeEvents(streamName: string, events: NewEvent[], options?: TCPWriteEventsOptions) {
    return await this.eventStore.writeEvents(streamName, events, options);
  }

  async subscribeToStream(streamName: string, onEvent, onDropped) {
    return await this.eventStore.subscribeToStream(streamName, onEvent, onDropped);
  }
}
