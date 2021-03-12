import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { AbstractESListener } from './abstract.es.listener';
import { LegalEntityMultiChainProducer } from './legal-entity.mc.producer';
export declare class LegalEntityEsListener extends AbstractESListener {
    constructor(multichainProducer: LegalEntityMultiChainProducer, eventStoreService: EventStore, checkpointService: CheckpointService);
}
