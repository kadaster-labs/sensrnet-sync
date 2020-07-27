import { v4 } from 'uuid';
const multichain = require('multichain-node');
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class MultichainProducer implements OnModuleInit {

    private connection;
    protected logger: Logger = new Logger(this.constructor.name);

    constructor(){};

    writeEvent(event, callback) {
        this.connection.publish({
            stream: 'sensors',
            key: v4(),
            data: Buffer.from(JSON.stringify(event)).toString('hex')
        }).then(() => {
            console.log('Successfully written event to MultiChain.')
            callback();
        }, (e) => console.error(e));
    }

    onModuleInit() {
        this.connection = multichain({
            port: 8002,
            host: '127.0.0.1',
            user: 'multichainrpc',
            pass: 'password'
        });
    }
}
