import { Injectable, Logger } from '@nestjs/common';
import {
  DatastreamAdded,
  DatastreamDeleted,
  SensorActivated,
  SensorDeactivated,
  SensorDeleted,
  SensorOwnershipShared,
  SensorOwnershipTransferred,
  SensorRegistered,
  SensorRelocated,
  SensorUpdated,
} from 'src/events/sensor';
import {LedgerConnection} from "../ledger.connection";
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

@Injectable()
export class SensorProcessor {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly ledgerConnection: LedgerConnection) {
  }

  async process(event): Promise<void> {
    if (event instanceof SensorRegistered) {
      await this.processCreated(event);
    } else if (event instanceof SensorUpdated) {
      await this.processUpdated(event);
    } else if (event instanceof SensorDeleted) {
      await this.processDeleted(event);
    } else if (event instanceof SensorActivated) {
      await this.processActivated(event);
    } else if (event instanceof SensorDeactivated) {
      await this.processDeactivated(event);
    } else if (event instanceof SensorOwnershipShared) {
      await this.processOwnershipShared(event);
    } else if (event instanceof SensorOwnershipTransferred) {
      await this.processOwnershipTransferred(event);
    } else if (event instanceof DatastreamAdded) {
      await this.processDataStreamCreated(event);
    } else if (event instanceof DatastreamDeleted) {
      await this.processDataStreamDeleted(event);
    } else if (event instanceof SensorRelocated) {
      await this.processLocationUpdated(event);
    } else {
      this.logger.warn(`Caught unsupported event: ${event}`);
    }
  }

  async processCreated(event: SensorRegistered) {
    try {
      const gateway = await this.ledgerConnection.openGateway();
      const contract = await this.ledgerConnection.getContract(gateway);

      await contract.submitTransaction('createSensor', 'SENSOR19', event.sensorId, event.nodeId, event.ownerId, event.name);

      await this.ledgerConnection.closeGateway(gateway);
    } catch (error) {
      console.error(`Failed to evaluate sensorCreated transaction: ${error}.`);
    }
  }

  async processUpdated(event: SensorUpdated) {
  }

  async processDeleted(event: SensorDeleted) {
  }

  async processActivated(event: SensorActivated) {
  }

  async processDeactivated(event: SensorDeactivated) {
  }

  async processOwnershipShared(event: SensorOwnershipShared) {
  }

  async processOwnershipTransferred(event: SensorOwnershipTransferred) {
  }

  async processDataStreamCreated(event: DatastreamAdded) {
  }

  async processDataStreamDeleted(event: DatastreamDeleted) {
  }

  async processLocationUpdated(event: SensorRelocated) {
  }

  private logError(event) {
    this.logger.error(`Error while syncing ${event.eventType}.`);
  }

}
