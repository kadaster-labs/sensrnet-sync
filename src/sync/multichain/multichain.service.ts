/// <reference types="./multichain" />
import { Connection, Item, Settings } from 'multichain';
import * as multichain from 'multichain-node';
import { Injectable, Logger } from '@nestjs/common';
import { MultiChainConfig } from '../../multichain.config';
import { DomainException } from '../core/errors/domain-exception';

@Injectable()
export class MultiChainService {

  private connection: Connection;

  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly multichainConfig: MultiChainConfig,
  ) {
  }

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

  async getAddress(): Promise<string> {
    try {
      return await this.getConnection().getAddresses();
    } catch (e) {
      throw new DomainException(e.message);
    }
  }

  async grant(address: string, permissions: string): Promise<void> {
    try {
      return await this.getConnection().grant({
        addresses: address,
        permissions: permissions,
      });
    } catch (e) {
      throw new DomainException(e.message);
    }
  }

  async createStream(streamName: string): Promise<void> {
    try {
      return await this.getConnection().create({
        open: true,
        name: streamName,
        type: 'stream',
      });
    } catch (e) {
      throw new DomainException(e.message);
    }
  }

  async createTransaction(streamName: string, key: string, data: string): Promise<void> {
    try {
      return await this.getConnection().publish({
        key: key,
        stream: streamName,
        data: Buffer.from(data).toString('hex'),
      });
    } catch (e) {
      throw new DomainException(e.message);
    }
  }

  async listStreamItems(settings: Settings): Promise<Item[]> {
    return this.getConnection().listStreamItems(settings);
  }

  async subscribe(settings: Settings): Promise<void> {
    return this.getConnection().subscribe(settings);
  }

}
