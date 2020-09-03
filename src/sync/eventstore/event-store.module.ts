import { Module } from '@nestjs/common';
import { EventStore } from './event-store';
import { EventStoreConfiguration } from './event-store.configuration';

@Module({
  providers: [
    EventStore,
    EventStoreConfiguration,
  ],
  exports: [
    EventStore,
    EventStoreConfiguration,
  ],
})

export class EventStoreModule {
}
