/// <reference types="./multichain" />
import { Connection, Item, Settings } from 'multichain';

import * as multichain from 'multichain-node';
import { DomainException } from '../core/errors/domain-exception';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MultichainConfig } from '../../multichain.config';

@Injectable()
export class MultiChainService implements OnModuleInit {
  private connection: Connection;

  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly multichainConfig: MultichainConfig,
  ) {
  }

  async getAddress(): Promise<string> {
    try {
      return await this.connection.getAddresses();
    } catch (e) {
      throw new DomainException(e.message);
    }
  }

  async grant(address: string, permissions: string): Promise<void> {
    try {
      return await this.connection.grant({
        addresses: address,
        permissions: permissions,
      });
    } catch (e) {
      throw new DomainException(e.message);
    }
  }

  async createStream(streamName: string): Promise<void> {
    try {
      return await this.connection.create({
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
      return await this.connection.publish({
        key: key,
        stream: streamName,
        data: Buffer.from(data).toString('hex'),
      });
    } catch (e) {
      throw new DomainException(e.message);
    }
  }

  async listStreamItems(settings: Settings): Promise<Item[]> {
    return this.connection.listStreamItems(settings);
  }

  async subscribe(settings: Settings): Promise<void> {
    return this.connection.subscribe(settings);
  }

  async initConnection(): Promise<void> {
    const config = this.multichainConfig.config;

    this.connection = multichain({
      port: config.port,
      host: config.hostname,
      user: config.username,
      pass: config.password,
    });
  }

  async onModuleInit(): Promise<void> {
    await this.initConnection();
  }

}
