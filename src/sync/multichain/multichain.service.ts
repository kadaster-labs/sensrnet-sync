/// <reference types="./multichain" />
import { Connection, Item } from 'multichain';
import * as multichain from 'multinodejs';
import { Injectable, Logger } from '@nestjs/common';
import { MultiChainConfig } from '../../multichain.config';

@Injectable()
export class MultiChainService {
  private connection: Connection;

  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly multichainConfig: MultiChainConfig,
  ) {}

  initConnection(): void {
    const config = this.multichainConfig.config;

    this.setConnection(multichain({
      port: config.port,
      host: config.hostname,
      user: config.username,
      pass: config.password,
    }));
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
    return await this.getConnection().getAddresses();
  }

  async grant(address: string, permissions: string): Promise<void> {
    return await this.getConnection().grant([address, permissions]);
  }

  async createStream(streamName: string): Promise<void> {
    return await this.getConnection().create(['stream', streamName, true]);
  }

  async createTransaction(streamName: string, key: string, data: string): Promise<void> {
    return await this.getConnection().publish([streamName, key, Buffer.from(data).toString('hex')]);
  }

  async listStreamItems(stream: string, start: number, count: number, verbose: boolean): Promise<Item[]> {
    return this.getConnection().listStreamItems([stream, verbose, count, start]);
  }

  async subscribe(stream: string): Promise<void> {
    return this.getConnection().subscribe([stream]);
  }

}
