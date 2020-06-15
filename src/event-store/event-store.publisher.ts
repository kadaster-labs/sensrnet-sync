import { EventStore } from './event-store';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventStorePublisher {
  constructor(private eventStore: EventStore) {
    this.eventStore.connect();
  }

  async subscribeToStream(streamName: string, onEvent, onDropped) {
    return await this.eventStore.subscribeToStream(streamName, onEvent, onDropped);
  }
}
