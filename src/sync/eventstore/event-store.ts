import { Injectable, OnModuleInit } from '@nestjs/common';
import { MappedEventAppearedCallback, TCPClient } from 'geteventstore-promise';
import {
    EventStoreCatchUpSubscription,
    LiveProcessingStartedCallback,
    SubscriptionDroppedCallback,
} from 'node-eventstore-client';
import { EventMessage } from '../core/events/event-message';
import { EventStoreConfiguration } from './event-store.configuration';

@Injectable()
export class EventStore implements OnModuleInit {
    private client!: TCPClient;

    constructor(private configuration: EventStoreConfiguration) {}

    connect(): void {
        this.client = new TCPClient(this.configuration.config);
    }

    async createEvent(event: EventMessage): Promise<void> {
        await this.client.writeEvent(event.streamId, event.eventType, event.data, event.metadata);
    }

    async subscribeToStreamFrom(
        streamName: string,
        fromEventNumber: number,
        onEventAppeared?: MappedEventAppearedCallback<EventStoreCatchUpSubscription>,
        onLiveProcessingStarted?: LiveProcessingStartedCallback,
        onDropped?: SubscriptionDroppedCallback<EventStoreCatchUpSubscription>,
    ): Promise<EventStoreCatchUpSubscription> {
        const settings = {
            readBatchSize: 1,
            resolveLinkTos: true,
        };

        return await this.client.subscribeToStreamFrom(
            streamName,
            fromEventNumber,
            onEventAppeared,
            onLiveProcessingStarted,
            onDropped,
            settings,
        );
    }

    async onModuleInit(): Promise<void> {
        this.connect();
    }
}
