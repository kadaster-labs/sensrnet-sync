import { Injectable, Logger } from '@nestjs/common';
import { createConnection } from 'node-eventstore-client';
import { EventStoreConfiguration } from '../../../event-store.configuration';

@Injectable()
export class EventStoreConnection {

    private readonly connection;
    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventStoreConfiguration: EventStoreConfiguration,
    ) {
        const config = this.eventStoreConfiguration.config;
        this.connection = createConnection({}, `tcp://${config.hostname}:${config.port}`);

        this.connection.connect().then(() => {
            this.logger.log(`Succesfully connected to eventstore.`);
        }, (err) => {
            this.logger.log(`Failed to connect to eventstore: ${err}`);
        });
    }

    getConnection() {
        return this.connection;
    }
}
