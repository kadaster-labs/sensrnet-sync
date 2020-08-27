import { EventStoreListener } from './eventstore.listener';
import { OwnerMultiChainConsumer } from './ownermc.consumer';
import { OwnerMultiChainProducer } from './ownermc.producer';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { EventStoreController } from './eventstore.controller';
import { OwnerMultiChainController } from './ownermc.controller';
import { MultiChainModule } from '../multichain/multichain.module';
import { CheckpointModule } from '../checkpoint/checkpoint.module';
import { EventStoreModule } from '../eventstore/event-store.module';
import { EventStoreService } from '../eventstore/event-store.service';
import { MultichainConfiguration } from '../../multichain.configuration';


@Module({
  imports: [
    CheckpointModule,
    EventStoreModule,
    MultiChainModule,
    OwnerQueryModule,
  ],
  controllers: [
    EventStoreController,
    OwnerMultiChainController,
  ],
  providers: [
    EventStoreService,
    EventStoreListener,
    MultichainConfiguration,
    OwnerMultiChainConsumer,
    OwnerMultiChainProducer,
  ],
})

export class OwnerQueryModule implements OnModuleInit {
  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly eventStoreService: EventStoreService,
    private readonly multichainConsumer: OwnerMultiChainConsumer,
  ) {}

  async eventListener(eventStoreService, eventMessage) {
    const metaData = { originSync: true };
    const streamId = `owner-${eventMessage.aggregateId}`;

    const event = {
      streamId,
      metadata: metaData,
      data: eventMessage,
      eventType: eventMessage.eventType,
    }

    await eventStoreService.createEvent(event);
  }

  async onModuleInit() {
    const callback = (message) => this.eventListener(this.eventStoreService, message);
    await this.multichainConsumer.listenerLoop(callback);
  }
}
