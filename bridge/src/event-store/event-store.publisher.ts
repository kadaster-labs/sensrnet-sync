import { EventStore } from './event-store';
import { Injectable } from '@nestjs/common';
import { TCPWriteEventOptions } from 'geteventstore-promise';

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
