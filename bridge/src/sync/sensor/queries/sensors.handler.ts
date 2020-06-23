import { RetrieveSensorsQuery } from './sensors.query';
import { LedgerInterface } from '../ledger-interface.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(RetrieveSensorsQuery)
export class RetrieveSensorsQueryHandler implements IQueryHandler<RetrieveSensorsQuery> {
    constructor(private readonly ledgerInterface: LedgerInterface) {
    }

    async execute(retrieveSensorsQuery: RetrieveSensorsQuery) {
        let result;

        try {
            const gateway = await this.ledgerInterface.openGateway();
            const contract = await this.ledgerInterface.getContract(gateway);

            const transactionPromise = await contract.evaluateTransaction('querySensor', retrieveSensorsQuery.id);
            result = JSON.parse(transactionPromise.toString());

            await this.ledgerInterface.closeGateway(gateway);
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}.`);
        }

        return result;
    }
}
