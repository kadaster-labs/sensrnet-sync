import {Logger, Module, OnModuleInit} from '@nestjs/common';
import {EventStoreModule} from '../../event-store/event-store.module';
import {EventStorePublisher} from '../../event-store/event-store.publisher';
import { SensorController } from './sensor.controller';
import {SensorProcessor} from './processors';
import {CqrsModule} from "@nestjs/cqrs";
import { LedgerInterface } from './ledger-interface.service';
import {RetrieveSensorsQueryHandler} from './queries/sensors.handler';
import {MongooseModule} from '@nestjs/mongoose';
import {StateSchema} from './models/state.model';
import {NewEvent, TCPWriteEventsOptions} from "geteventstore-promise";

@Module({
  imports: [
    CqrsModule,
    EventStoreModule,
    SensorQueryModule,
    MongooseModule.forFeature([{name: 'State', schema: StateSchema}]),
  ],
  controllers: [
    SensorController
  ],
  providers: [
    SensorProcessor,
    LedgerInterface,
    RetrieveSensorsQueryHandler,
  ],
})

export class SensorQueryModule implements OnModuleInit {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
      private readonly eventStore: EventStorePublisher,
      private readonly sensorProcessor: SensorProcessor,
      private readonly ledgerInterface: LedgerInterface,
  ) {
  }
  onModuleInit() {
    const onEvent = (_, eventMessage) => {
      this.sensorProcessor.process(eventMessage);
    };

    this.eventStore.subscribeToStream('$ce-sensor', onEvent, () => {
      this.logger.warn('Event stream dropped');
    });

    const publishEventCallback = (event) => {
      const newEvent: NewEvent = {
        eventId: event.messageId,
        eventType: `test-test`,
        data: event,
      }

      const writeEventOptions: TCPWriteEventsOptions = {
        expectedVersion: -1  // ExpectedVersion.NoStream.
      }

      this.eventStore.writeEvents('$ce-test', [newEvent], writeEventOptions).then(() => {},
          () => this.logger.log('Event has already been written.'));
    };
    this.ledgerInterface.initContractListener(publishEventCallback);
  }
}
