import { v4 } from 'uuid';
import * as multichain from 'multichain-node';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DomainException } from '../core/errors/domain-exception';
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
                permissions: permissions
            });
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    async createStream(name) {
        try {
            return await this.connection.create({
                name: name,
                open: true,
                type: 'stream',
            });
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    async createTransaction(stream, data) {
        try {
            return await this.connection.publish({
                key: v4(),
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
