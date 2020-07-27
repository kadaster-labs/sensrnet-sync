import { v4 } from 'uuid';
import * as multichain from 'multichain-node';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MultichainConfiguration } from '../../multichain.configuration';

@Injectable()
export class MultichainProducer implements OnModuleInit {

    private connection;

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly multichainConfiguration: MultichainConfiguration,
    ){};

    writeEvent(event, callback) {
        this.connection.publish({
            key: v4(),
            stream: 'sensors',
            data: Buffer.from(JSON.stringify(event)).toString('hex')
        }).then(callback, (e) => this.logger.error(e));
    }

    onModuleInit() {
        const config = this.multichainConfiguration.config;

        this.connection = multichain({
            port: config.port,
            host: config.hostname,
            user: config.username,
            pass: config.password,
        });
    }
}
