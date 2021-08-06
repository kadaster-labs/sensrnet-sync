import { Injectable, Logger } from '@nestjs/common';
import * as multichain from 'multinodejs';
import { MultiChainConfig } from '../../multichain.config';
import { Connection, Item } from '../../multichain.d';

@Injectable()
export class MultiChainService {
    private connection: Connection;

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(private readonly multichainConfig: MultiChainConfig) {}

    initConnection(): void {
        const config = this.multichainConfig.config;

        this.setConnection(
            multichain({
                port: config.port,
                host: config.hostname,
                user: config.username,
                pass: config.password,
            }),
        );
    }

    getConnection(): Connection {
        if (!this.connection) {
            this.initConnection();
        }
        return this.connection;
    }

    setConnection(connection: Connection): void {
        this.connection = connection;
    }

    async getAddresses(): Promise<string[]> {
        return this.getConnection().getAddresses();
    }

    async getPrivateKey(address: string): Promise<string> {
        return this.getConnection().dumpPrivKey({ address });
    }

    async grant(address: string, permissions: string): Promise<void> {
        return this.getConnection().grant([address, permissions]);
    }

    async createStream(streamName: string): Promise<void> {
        return this.getConnection().create(['stream', streamName, true]);
    }

    async createTransaction(streamName: string, key: string, data: string): Promise<void> {
        return this.getConnection().publish([streamName, key, Buffer.from(data).toString('hex')]);
    }

    async createVariable(variableName: string, data: Record<string, any>): Promise<void> {
        return this.getConnection().create(['variable', variableName, true, JSON.stringify(data)]);
    }

    async listStreamItems(stream: string, start: number, count: number, verbose: boolean): Promise<Item[]> {
        return this.getConnection().listStreamItems([stream, verbose, count, start]);
    }

    async subscribe(stream: string): Promise<void> {
        return this.getConnection().subscribe([stream]);
    }

    async approveFrom(address: string, filterName: string, approve: boolean): Promise<void> {
        return this.getConnection().approveFrom([address, filterName, approve]);
    }
}
