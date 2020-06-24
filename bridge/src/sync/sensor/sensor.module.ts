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

  getConnection() {
    const settings = {};
    const config = this.eventStoreConfiguration.config;
    const endpoint = `tcp://${config.hostname}:${config.port}`
    const connection = createConnection(settings, endpoint);
    connection.connect().catch(err => this.logger.log(err));

    return connection;
  }

  initSubscriptionListener(streamName: string) {
    const resolveLinkTos = true;

    const onEvent = (_, event) => {
      const eventStoreEvent = {
        eventType: event.event.eventType,
        data: JSON.parse(event.event.data.toString()),
      };
      if (event.event.metadata) {
        eventStoreEvent['metadata'] = JSON.parse(event.event.metadata.toString())
      }

      if (!eventStoreEvent['metadata'] || !eventStoreEvent['metadata'].originSync) {
        this.sensorProcessor.process(eventStoreEvent).then(() => {});
      }
    };

    const subscriptionDropped = (subscription, reason, error) => {
      this.logger.log(error ? error : 'Subscription dropped.')
    }

    const connection = this.getConnection();
    const config = this.eventStoreConfiguration.config;
    const credentials = new UserCredentials(config.credentials.username, config.credentials.password);

    connection.once('connected', _ => {
      connection.subscribeToStream(
          streamName,
          resolveLinkTos,
          onEvent,
          subscriptionDropped,
          credentials
      ).then(() => {})
    });

    connection.on('closed', reason => {
      this.logger.log(`Connection closed, reason: ${reason}`);
    });
  }

  initContractListener() {
    const connection = this.getConnection();

    const publishEventCallback = (eventMessage) => {
      const metaData = {
        originSync: true
      }
      const event = createJsonEventData(eventMessage.eventId, eventMessage, metaData, eventMessage.eventType);

      connection.appendToStream(`sensor-${eventMessage.aggregateId}`, expectedVersion.any, event)
          .then((_) => {
            this.logger.log(`Sync event with id ${eventMessage.eventId} has been written.`);
          })
          .catch((err) => {
            this.logger.log(err);
          });
    };
    this.ledgerInterface.initContractListener(publishEventCallback).then(() => {});
  }

  onModuleInit() {
    this.initSubscriptionListener('$ce-sensor');
    this.initContractListener();
  }
}
