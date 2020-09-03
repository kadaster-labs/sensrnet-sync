import { Module } from '@nestjs/common';
import { EventStore } from './event-store';
import { EventStore } from './event-store';
import { EventStoreConfiguration } from './event-store.configuration';

@Module({
  providers: [
    EventStore,
    EventStore,
    EventStoreConfiguration,
  ],
  exports: [
    EventStore,
    EventStore,
  ],
})

export class EventStoreModule {
}
