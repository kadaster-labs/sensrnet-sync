/// <reference types="./multichain" />
import { Connection, Item } from 'multichain';
import { Logger } from '@nestjs/common';
import { MultiChainConfig } from '../../multichain.config';
export declare class MultiChainService {
    private readonly multichainConfig;
    private connection;
    protected logger: Logger;
    constructor(multichainConfig: MultiChainConfig);
    initConnection(): void;
    getConnection(): Connection;
    setConnection(connection: Connection): void;
    getAddresses(): Promise<string[]>;
    grant(address: string, permissions: string): Promise<void>;
    createStream(streamName: string): Promise<void>;
    createTransaction(streamName: string, key: string, data: string): Promise<void>;
    createVariable(variableName: string, data: Record<string, any>): Promise<void>;
    listStreamItems(stream: string, start: number, count: number, verbose: boolean): Promise<Item[]>;
    subscribe(stream: string): Promise<void>;
    approveFrom(address: string, filterName: string, approve: boolean): Promise<void>;
}
