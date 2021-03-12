import { OnModuleInit } from '@nestjs/common';
import { MappedEventAppearedCallback } from 'geteventstore-promise';
import { EventStoreConfiguration } from './event-store.configuration';
import { EventStoreCatchUpSubscription, LiveProcessingStartedCallback, SubscriptionDroppedCallback } from 'node-eventstore-client';
import { EventMessage } from '../core/events/event-message';
export declare class EventStore implements OnModuleInit {
    private configuration;
    private client;
    constructor(configuration: EventStoreConfiguration);
    connect(): void;
    createEvent(event: EventMessage): Promise<void>;
    subscribeToStreamFrom(streamName: string, fromEventNumber: number, onEventAppeared?: MappedEventAppearedCallback<EventStoreCatchUpSubscription>, onLiveProcessingStarted?: LiveProcessingStartedCallback, onDropped?: SubscriptionDroppedCallback<EventStoreCatchUpSubscription>): Promise<EventStoreCatchUpSubscription>;
    onModuleInit(): Promise<void>;
}
