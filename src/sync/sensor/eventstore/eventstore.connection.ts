import { Injectable, Logger } from '@nestjs/common';
import { createConnection } from 'node-eventstore-client';
import { EventStoreConfiguration } from '../../../event-store.configuration';

@Injectable()
export class EventStoreConnection {

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventStoreConfiguration: EventStoreConfiguration,
    ) {}

    getConnection() {
        const config = this.eventStoreConfiguration.config;
        const connection = createConnection({}, `tcp://${config.hostname}:${config.port}`);
        connection.connect().then();

        return connection;
    }
}
