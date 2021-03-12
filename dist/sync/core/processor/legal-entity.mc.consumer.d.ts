import { Event as ESEvent } from 'geteventstore-promise';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { MultiChainService } from '../../multichain/multichain.service';
import { AbstractMsConsumer } from './abstract.mc.consumer';
export declare class LegalEntityMultiChainConsumer extends AbstractMsConsumer {
    constructor(eventStoreService: EventStore, checkpointService: CheckpointService, multichainService: MultiChainService);
    publishToEventStore(eventMessage: ESEvent): Promise<void>;
}
