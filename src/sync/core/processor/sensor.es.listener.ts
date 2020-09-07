import { Event } from '../events/event';
import { plainToClass } from 'class-transformer';
import { sensorEventType } from '../events/sensor';
import { SensorMultiChainProducer } from './sensor.mc.producer';
import { Injectable } from '@nestjs/common';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { SubscriptionExistsException } from '../errors/subscription-exists-exception';
import { AbstractESListener } from './abstract.es.listener';

@Injectable()
export class SensorESListener extends AbstractESListener {

  constructor(
    private readonly multichainProducer: SensorMultiChainProducer,
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
  ) {
    super('sync-sensor-es', eventStoreService, checkpointService);
  }

  async openSubscription(): Promise<void> {
    if (!this.subscriptionExists()) {
      const onEvent = async (_, eventMessage) => {
        const conditions = { _id: super.checkpointId };
        const update = { offset: eventMessage.positionEventNumber };
        const callback = () => this.checkpointService.updateOne(conditions, update);
        if (!eventMessage['metadata'] || !eventMessage['metadata'].originSync) {
          const eventMessageFormatted = {
            ...eventMessage.data,
            eventType: eventMessage.eventType,
          };
          const event: Event = plainToClass(sensorEventType.getType(eventMessage.eventType),
            eventMessageFormatted as Event);
          await this.multichainProducer.publishEvent(event, callback);
        } else {
          await callback();
        }
      };
      await this.subscribeToStreamFrom('$ce-sensor', this.checkpointId, onEvent);
    } else {
      throw new SubscriptionExistsException();
    }
  }
}
