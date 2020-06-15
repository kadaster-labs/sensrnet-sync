import { RetrieveSensorsQuery } from './sensors.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

@QueryHandler(RetrieveSensorsQuery)
export class RetrieveSensorsQueryHandler implements IQueryHandler<RetrieveSensorsQuery> {

    async execute(retrieveSensorsQuery: RetrieveSensorsQuery) {
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

            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            const transactionPromise = await contract.evaluateTransaction('queryAllSensors');
            result = transactionPromise.toString();

            // Disconnect from the gateway.
            await gateway.disconnect();

        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            result = null;
        }

        return result;
    }
}
