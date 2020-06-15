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

@Injectable()
export class SensorProcessor {
  protected logger: Logger = new Logger(this.constructor.name);

  async process(event): Promise<void> {
  }

  async processCreated(event: SensorRegistered) {
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
