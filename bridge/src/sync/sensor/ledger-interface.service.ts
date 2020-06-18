import { resolve } from 'path';
import { Model } from 'mongoose';
import { readFileSync } from 'fs';
import { Logger } from "@nestjs/common";
import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { State } from "./models/state.interface";
import { ContractListener, Gateway, ListenerOptions, Wallets } from 'fabric-network';

@Injectable()
export class LedgerInterface {
    private readonly ccp: any;
    private readonly userName: string = 'appUser';
    private readonly channelName: string = 'mychannel';
    private readonly contractName: string = 'sensrnet';

    private connectionTimeout = 1000;
    private connectionSuccess: boolean = false;

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        @InjectModel('State') private stateModel: Model<State>,
    ) {
        const ccpPath = resolve(__dirname, '.', 'connection-org1.json');
        this.ccp = JSON.parse(readFileSync(ccpPath, 'utf8'));
    }

    public getChannelName(): string {
        return this.channelName;
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

    async registerContractListener(contract, lastBlockNumber, listener) {
        const options: ListenerOptions = {};
        if (lastBlockNumber !== null) {
            options.startBlock = lastBlockNumber;
        }
        return await contract.addContractListener(listener, options);
    }

    async initContractListener(publishEventCallback) {
        const channelName = this.getChannelName();
        const lastState = await this.stateModel.findOne({_id: channelName});
        const lastBlockNumber = lastState ? lastState.blockNumber : 0;

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
                await this.stateModel.updateOne(filterKwargs, updateKwargs, { upsert: true })
            }

            const listenerObject = await this.registerContractListener(contract, lastBlockNumber, listener);

            // In case the block number is higher than the current (after a network restart), the app gets stuck.
            setTimeout(() => {
                if (lastBlockNumber > 0 && !this.connectionSuccess) {
                    contract.removeContractListener(listenerObject);
                    this.registerContractListener(contract, null, listener); // Replay from the start.
                }
            }, this.connectionTimeout);
        } catch (error) {
            console.log(error);
        }
    }
}
