import { Module } from '@nestjs/common';
import { EventStore } from './event-store';
import { EventStoreService } from './event-store.service';
import { EventStoreConfiguration } from './event-store.configuration';

@Module({
  providers: [
    EventStore,
    EventStoreService,
    EventStoreConfiguration,
  ],
  exports: [
    EventStore,
    EventStoreService
  ],
})

export class EventStoreModule {}
