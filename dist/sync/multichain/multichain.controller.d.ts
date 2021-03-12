import { GrantBody } from './model/grant-body';
import { StreamBody } from './model/stream-body';
import { ApproveBody } from './model/approve-body';
import { MultiChainService } from './multichain.service';
import { TransactionBody } from './model/transaction-body';
export declare class MultiChainController {
    private readonly multiChainService;
    constructor(multiChainService: MultiChainService);
    retrieveAddresses(): Promise<string[]>;
    grant(body: GrantBody): Promise<void>;
    createStream(body: StreamBody): Promise<void>;
    createTransaction(body: TransactionBody): Promise<void>;
    approveFilter(body: ApproveBody): Promise<void>;
    disapproveFilter(body: ApproveBody): Promise<void>;
}
