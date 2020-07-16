import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ContractListener, Gateway, ListenerOptions, Wallets } from 'fabric-network';

@Injectable()
export class LedgerInterface {
    private readonly ccp: any;
    private readonly userName: string = 'admin';
    private readonly channelName: string = 'mychannel';
    private readonly contractName: string = 'sensrnet';

    private connectionSuccess: boolean = false;

    protected logger: Logger = new Logger(this.constructor.name);

    constructor() {
        const ccpPath = resolve(process.cwd(), '.', 'connection.json');
        this.ccp = JSON.parse(readFileSync(ccpPath, 'utf8'));
    }

    public getChannelName(): string {
        return this.channelName;
    }

    async openGateway() {
        const walletPath = resolve(process.cwd(), '.', 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const identity = await wallet.get(this.userName);
        if (!identity) {
            Logger.error('An identity for the user "appUser" does not exist in the wallet');
            Logger.error('Run the registerUser.js application before retrying');
            // Logger.error(`Current path: ${walletPath}`)
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(this.ccp, {
            wallet,
            identity: this.userName,
            discovery: {enabled: true, asLocalhost: false}
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

    async registerContractListener(contract, lastBlockNumber, listener) {
        const options: ListenerOptions = {};
        if (lastBlockNumber !== null) {
            options.startBlock = lastBlockNumber;
        }
        return await contract.addContractListener(listener, options);
    }

    async initContractListener(publishEventCallback) {
        const channelName = this.getChannelName();
        const lastBlockNumber = 0; // lastState ? lastState.blockNumber :

        try {
            const gateway = await this.openGateway();
            const contract = await this.getContract(gateway);

            const listener: ContractListener = async (event) => {
                this.connectionSuccess = true;

                const transactionEvent = event.getTransactionEvent();
                const blockEvent = transactionEvent.getBlockEvent();
                const blockNumber = blockEvent.blockNumber.toNumber();
                publishEventCallback(JSON.parse(event.payload.toString()));

                const filterKwargs = {
                    _id: channelName
                }
                const updateKwargs = {
                    $set: { blockNumber: blockNumber },
                    $setOnInsert: { _id: channelName }
                }
            }

            await this.registerContractListener(contract, lastBlockNumber, listener);
        } catch (error) {
            console.log(error);
        }
    }
}
