import {Logger, Module, OnModuleInit} from '@nestjs/common';
import {EventStoreModule} from '../../event-store/event-store.module';
import {EventStorePublisher} from '../../event-store/event-store.publisher';
import {SensorProcessor} from './processors';
import {plainToClass} from 'class-transformer';
import {sensorEventType} from '../../events/sensor';

@Module({
  imports: [
    EventStoreModule,
    SensorQueryModule,
  ],
  providers: [
    SensorProcessor,
  ],
})

export class SensorQueryModule implements OnModuleInit {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
      private readonly eventStore: EventStorePublisher,
      private readonly sensorProcessor: SensorProcessor,
  ) {
  }
  onModuleInit() {
    const onEvent = (_, eventMessage) => {
      const event = plainToClass(sensorEventType.getType(eventMessage.eventType), eventMessage.data);
      this.sensorProcessor.process(event);
    };


    this.eventStore.subscribeToStream('$ce-sensor', onEvent, () => {
      this.logger.warn('Event stream dropped');
    });
  }
}
