import { EventStore } from './event-store';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EventStoreService {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(private eventStore: EventStore) {
    this.eventStore.connect();
  }

  async createEvent(event) {
    await this.eventStore.createEvent(event);
  }

  subscribeToStreamFrom(streamName, fromEventNumber, onEvent, onLiveProcessingStarted, onDropped) {
    return this.eventStore.subscribeToStreamFrom(streamName, fromEventNumber, onEvent, onLiveProcessingStarted, onDropped);
  }

  async deleteStream(streamName: string, hardDelete?: boolean) {
    return await this.eventStore.deleteStream(streamName, hardDelete);
  }
}
