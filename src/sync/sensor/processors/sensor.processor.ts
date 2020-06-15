import {Injectable, Logger} from '@nestjs/common';
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
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

@Injectable()
export class SensorProcessor {
  protected logger: Logger = new Logger(this.constructor.name);

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
    let result;

    try {
      // load the network configuration
      const ccpPath = path.resolve(__dirname, '..', 'connection-org1.json');
      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

      // Create a new file system based wallet for managing identities.
      const walletPath = path.resolve(__dirname, '..', 'wallet');
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      // Check to see if we've already enrolled the user.
      const identity = await wallet.get('appUser');
      if (!identity) {
        console.log('An identity for the user "appUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
      }

      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('mychannel');


      // Get the contract from the network.
      const contract = network.getContract('sensrnet');

      await contract.submitTransaction('createSensor', 'SENSOR19', event.sensorId, event.nodeId, event.ownerId, event.name);

      console.log('Transaction has been submitted', );

      // Disconnect from the gateway.
      await gateway.disconnect();

    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      result = null;
    }

    return result;
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
