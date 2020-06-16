import { RetrieveSensorsQuery } from './sensors.query';
import { LedgerConnection } from '../ledger.connection';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(RetrieveSensorsQuery)
export class RetrieveSensorsQueryHandler implements IQueryHandler<RetrieveSensorsQuery> {
    constructor(private readonly ledgerConnection: LedgerConnection) {
    }

    async execute(retrieveSensorsQuery: RetrieveSensorsQuery) {
        let result;

        try {
            const gateway = await this.ledgerConnection.openGateway();
            const contract = await this.ledgerConnection.getContract(gateway);

            const transactionPromise = await contract.evaluateTransaction('queryAllSensors');
            result = transactionPromise.toString();

            await this.ledgerConnection.closeGateway(gateway);
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}.`);
        }

        return result;
    }
}
