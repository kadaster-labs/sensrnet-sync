import { Injectable } from '@nestjs/common';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { legalEntityEventType, legalEntityStreamRootValue } from '../events/legal-entity';
import { AbstractESListener } from './abstract.es.listener';
import { LegalEntityMultiChainProducer } from './legal-entity.mc.producer';

@Injectable()
export class LegalEntityEsListener extends AbstractESListener {
    constructor(
        multichainProducer: LegalEntityMultiChainProducer,
        eventStoreService: EventStore,
        checkpointService: CheckpointService,
    ) {
        super(
            `$ce-${legalEntityStreamRootValue}`,
            `sync-${legalEntityStreamRootValue}-es`,
            legalEntityEventType,
            eventStoreService,
            checkpointService,
            multichainProducer,
        );
    }
}
