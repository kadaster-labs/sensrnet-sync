import { Injectable } from '@nestjs/common';
import { TCPClient} from 'geteventstore-promise';
import { EventStoreConfiguration } from './event-store.configuration';

@Injectable()
export class EventStore {
  private client!: TCPClient;

  constructor(private configuration: EventStoreConfiguration) {}

  connect() {
    this.client = new TCPClient(this.configuration.config);
  }

  async close() {
    return await this.client.close();
  }

  async closeAllPools() {
    return await this.client.closeAllPools();
  }

  async exists(streamName: string) {
    return await this.client.checkStreamExists(streamName);
  }

  async createEvent(event) {
    await this.client.writeEvent(
        event.streamId,
        event.eventType,
        event.data,
        event.metadata,
    );
  }

  async getEvents(streamName: string) {
    return await this.client.getAllStreamEvents(streamName);
  }

  async deleteStream(streamName: string, hardDelete?: boolean) {
    return await this.client.deleteStream(streamName, hardDelete);
  }

  async checkStreamExists(streamName) {
    return await this.client.checkStreamExists(streamName);
  }

  async subscribeToStreamFrom(streamName: string, fromEventNumber: number, onEventAppeared, onLiveProcessingStarted, onDropped) {
    const settings = {
      readBatchSize: 1,
      resolveLinkTos: true,
    };

    return await this.client.subscribeToStreamFrom(streamName, fromEventNumber, onEventAppeared, onLiveProcessingStarted, onDropped, settings);
  }
}
