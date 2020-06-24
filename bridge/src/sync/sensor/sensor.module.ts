import { CqrsModule } from '@nestjs/cqrs';
import { SensorProcessor } from './processors';
import { MongooseModule } from '@nestjs/mongoose';
import { StateSchema } from './models/state.model';
import { SensorController } from './sensor.controller';
import { LedgerInterface } from './ledger-interface.service';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { EventStoreConfiguration } from '../../event-store.configuration';
import { RetrieveSensorsQueryHandler } from './queries/sensors.handler';
import { UserCredentials, createConnection, createJsonEventData, expectedVersion } from 'node-eventstore-client';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'State', schema: StateSchema }]),
  ],
  controllers: [
    SensorController,
  ],
  providers: [
    SensorProcessor,
    LedgerInterface,
    EventStoreConfiguration,
    RetrieveSensorsQueryHandler,
  ],
})

export class SensorQueryModule implements OnModuleInit {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly sensorProcessor: SensorProcessor,
    private readonly ledgerInterface: LedgerInterface,
    private readonly eventStoreConfiguration: EventStoreConfiguration,
  ) {
  }

  onModuleInit() {
    const syncEventTypePrefix = 'Sync-';

    const onEvent = (_, event) => {
      const eventStoreEvent = {
        eventType: event.event.eventType,
        data: JSON.parse(event.event.data.toString()),
        eventNumber: event.event.eventNumber.toNumber(),
      };

      if (!eventStoreEvent.eventType.startsWith(syncEventTypePrefix)) {
        this.sensorProcessor.process(eventStoreEvent);
      }
    };

    const resolveLinkTos = true

    const subscriptionDropped = (subscription, reason, error) => {
      this.logger.log(error ? error : 'Subscription dropped.')
    }

    const config = this.eventStoreConfiguration.config;

    const settings = {};
    const endpoint = `tcp://${config.hostname}:${config.port}`
    const connection = createConnection(settings, endpoint);
    const credentials = new UserCredentials(config.credentials.username, config.credentials.password);

    connection.connect().catch(err => this.logger.log(err))

    connection.once('connected', _ => {
      connection.subscribeToStream(
          '$ce-sensor',
          resolveLinkTos,
          onEvent,
          subscriptionDropped,
          credentials
      ).then(() => {})
    });

    connection.on('error', error => {
      this.logger.log(`Error occurred on connection: ${error}`);
    })

    connection.on('closed', reason => {
      this.logger.log(`Connection closed, reason: ${reason}`);
    })

    const publishEventCallback = (eventMessage) => {
      const eventType = `${syncEventTypePrefix}-${eventMessage.eventType}`;
      const event = createJsonEventData(eventMessage.eventId, eventMessage, null, eventType);
      connection.appendToStream(`sensor-${eventMessage.aggregateId}`, expectedVersion.any, event)
          .then((_) => {
            this.logger.log(`Event with id ${eventMessage.eventId} has been received.`);
          })
          .catch((err) => {
            this.logger.log(err);
          });
    };
    this.ledgerInterface.initContractListener(publishEventCallback);
  }
}
