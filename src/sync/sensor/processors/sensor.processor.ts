import { Injectable, Logger } from '@nestjs/common';
import { LedgerConnection } from "../ledger.connection";

@Injectable()
export class SensorProcessor {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly ledgerConnection: LedgerConnection) {
  }

  async process(eventMessage): Promise<void> {
    try {
      const gateway = await this.ledgerConnection.openGateway();
      const contract = await this.ledgerConnection.getContract(gateway);

      let eventMessageFormatted = {
        ...eventMessage.data,
        messageId: eventMessage.eventId,
        eventType: eventMessage.eventType,
      }
      await contract.submitTransaction('publishEvent', JSON.stringify(eventMessageFormatted));

      await this.ledgerConnection.closeGateway(gateway);
    } catch (error) {
      this.logError(eventMessage.eventType, error);
    }
  }

  private logError(eventType, error) {
    this.logger.error(`Error while syncing ${eventType}: ${error}.`);
  }
}
