import { CqrsModule } from '@nestjs/cqrs';
import { SensorProcessor } from './processors';
import { MongooseModule } from '@nestjs/mongoose';
import { StateSchema } from './models/state.model';
import { SensorController } from './sensor.controller';
import { LedgerInterface } from './ledger-interface.service';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TCPWriteEventsOptions } from 'geteventstore-promise';
import { EventStoreModule } from '../../event-store/event-store.module';
import { RetrieveSensorsQueryHandler } from './queries/sensors.handler';
import { EventStorePublisher } from '../../event-store/event-store.publisher';

const NODE_ID = process.env.NODE_ID || 'node_1';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule,
    MongooseModule.forFeature([{ name: 'State', schema: StateSchema }]),
  ],
  controllers: [
    SensorController,
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
      if (eventMessage.data.nodeId == NODE_ID) {
        this.sensorProcessor.process(eventMessage);
      }
    };

    this.eventStore.subscribeToStream('$ce-sensor', onEvent, () => {
      this.logger.warn('Event stream dropped.');
    });

    const publishEventCallback = (event) => {
      if (event.nodeId != NODE_ID) {
        const newEvent = {
          streamId: `sensor-${event.aggregateId}`,
          eventType: event.eventType,
          data: event,
        };

        const writeEventOptions: TCPWriteEventsOptions = {
          expectedVersion: event.eventNumber - 1,
        };

        this.eventStore.createEvent(newEvent, writeEventOptions)
            .then(() => {}, (error) => this.logger.log(`Event has already been written: ${error.toString()}`));
      }
    };
    this.ledgerInterface.initContractListener(publishEventCallback);
  }
}
