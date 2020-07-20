import { Module } from '@nestjs/common';
import { EventStore } from './event-store';
import { EventStoreConfiguration } from './event-store.configuration';
import { EventStoreService } from "./event-store.service";

@Module({
  providers: [EventStore, EventStoreService, EventStoreConfiguration],
  exports: [EventStore, EventStoreService],
})

export class EventStoreModule {}
