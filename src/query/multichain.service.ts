import * as multichain from 'multichain-node';
import { Injectable, Logger } from '@nestjs/common';
import { MultichainConfiguration } from "../multichain.configuration";

@Injectable()
export class MultiChainService {

    private connection;

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly multichainConfiguration: MultichainConfiguration,
    ) {
        const config = this.multichainConfiguration.config;

        this.connection = multichain({
            port: config.port,
            host: config.hostname,
            user: config.username,
            pass: config.password,
        });
    }

    async getAddress() {
        return await this.connection.getAddresses();
    }

    async grant(address, permissions) {
        return await this.connection.grant({
            addresses: address,
            permissions: permissions
        })
    }
}
