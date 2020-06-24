import { Injectable, Logger } from '@nestjs/common';
import { LedgerInterface } from "../ledger-interface.service";

@Injectable()
export class SensorProcessor {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly ledgerInterface: LedgerInterface) {
  }

  async process(eventMessage): Promise<void> {
    try {
      const gateway = await this.ledgerInterface.openGateway();
      const contract = await this.ledgerInterface.getContract(gateway);

      let eventMessageFormatted = {
        ...eventMessage.data,
        eventType: eventMessage.eventType,
      }
      await contract.submitTransaction('publishEvent', JSON.stringify(eventMessageFormatted));

      await this.ledgerInterface.closeGateway(gateway);
    } catch (error) {
      this.logError(eventMessage.eventType, error);
    }
  }

  private logError(eventType, error) {
    this.logger.error(`Error while syncing ${eventType}: ${error}.`);
  }
}
