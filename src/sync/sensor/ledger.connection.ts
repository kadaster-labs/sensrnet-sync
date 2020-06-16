import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Logger } from "@nestjs/common";
import { Injectable } from '@nestjs/common';
import { Gateway, Wallets } from 'fabric-network';

@Injectable()
export class LedgerConnection {
    private readonly ccp: any;
    private readonly userName: string = 'appUser';
    private readonly channelName: string = 'mychannel';
    private readonly contractName: string = 'sensrnet';

    constructor() {
        const ccpPath = resolve(__dirname, '.', 'connection-org1.json');
        this.ccp = JSON.parse(readFileSync(ccpPath, 'utf8'));
    }

    async openGateway() {
        const walletPath = resolve(__dirname, '.', 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const identity = await wallet.get(this.userName);
        if (!identity) {
            Logger.error('An identity for the user "appUser" does not exist in the wallet');
            Logger.error('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(this.ccp, {
            wallet,
            identity: this.userName,
            discovery: {enabled: true, asLocalhost: true}
        });

        return gateway;
    }

    async closeGateway(gateway: Gateway) {
        await gateway.disconnect();
    }

    async getContract(gateway: Gateway) {
        const network = await gateway.getNetwork(this.channelName);

        return network.getContract(this.contractName);
    }
}
