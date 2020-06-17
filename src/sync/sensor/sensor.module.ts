import {Logger, Module, OnModuleInit} from '@nestjs/common';
import {EventStoreModule} from '../../event-store/event-store.module';
import {EventStorePublisher} from '../../event-store/event-store.publisher';
import { SensorController } from './sensor.controller';
import {SensorProcessor} from './processors';
import {CqrsModule} from "@nestjs/cqrs";
import { LedgerConnection } from './ledger.connection';
import {RetrieveSensorsQueryHandler} from './queries/sensors.handler';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule,
    SensorQueryModule,
  ],
  controllers: [
    SensorController
  ],
  providers: [
    SensorProcessor,
    LedgerConnection,
    RetrieveSensorsQueryHandler,
  ],
})

export class SensorQueryModule implements OnModuleInit {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
      private readonly eventStore: EventStorePublisher,
      private readonly sensorProcessor: SensorProcessor,
  ) {
  }
  onModuleInit() {
    const onEvent = (_, eventMessage) => {
      this.sensorProcessor.process(eventMessage);
    };

    this.eventStore.subscribeToStream('$ce-sensor', onEvent, () => {
      this.logger.warn('Event stream dropped');
    });
  }
}
