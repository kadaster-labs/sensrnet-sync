import { Injectable } from '@nestjs/common';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { observationGoalEventType, observationGoalStreamRootValue } from '../events/observation-goal';
import { AbstractESListener } from './abstract.es.listener';
import { ObservationGoalMultiChainProducer } from './observation-goal.mc.producer';

@Injectable()
export class ObservationGoalEsListener extends AbstractESListener {

  constructor(
    multichainProducer: ObservationGoalMultiChainProducer,
    eventStoreService: EventStore,
    checkpointService: CheckpointService,
  ) {
    super(`$ce-${observationGoalStreamRootValue}`, `sync-${observationGoalStreamRootValue}-es`, observationGoalEventType, eventStoreService,
      checkpointService, multichainProducer);
  }

}
