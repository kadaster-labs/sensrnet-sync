import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { AbstractESListener } from './abstract.es.listener';
import { ObservationGoalMultiChainProducer } from './observation-goal.mc.producer';
export declare class ObservationGoalEsListener extends AbstractESListener {
    constructor(multichainProducer: ObservationGoalMultiChainProducer, eventStoreService: EventStore, checkpointService: CheckpointService);
}
