import * as multichain from 'multichain-node';
import { DomainException } from '../core/errors/domain-exception';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MultichainConfiguration } from '../../multichain.configuration';

@Injectable()
export class MultiChainService implements OnModuleInit {
    private connection;

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly multichainConfiguration: MultichainConfiguration,
    ) {}

    async getAddress() {
        try {
            return await this.connection.getAddresses();
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    async grant(address, permissions) {
        try {
            return await this.connection.grant({
                addresses: address,
                permissions: permissions,
            });
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    async createStream(name) {
        try {
            return await this.connection.create({
                open: true,
                name: name,
                type: 'stream',
            });
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    async createTransaction(stream, key, data) {
        try {
            return await this.connection.publish({
                key: key,
                stream: stream,
                data: Buffer.from(data).toString('hex'),
            });
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    async listStreamItems(settings) {
        return await this.connection.listStreamItems(settings);
    }

    async subscribe(settings) {
        return await this.connection.subscribe(settings);
    }

    async initConnection() {
        const config = this.multichainConfiguration.config;

        this.connection = multichain({
            port: config.port,
            host: config.hostname,
            user: config.username,
            pass: config.password,
        });
    }

    async onModuleInit() {
        await this.initConnection();
    }
}
