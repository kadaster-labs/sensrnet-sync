import { Injectable } from '@nestjs/common';
import { Event as ESEvent } from 'geteventstore-promise';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { MultiChainService } from '../../multichain/multichain.service';
import { Event } from '../events/event';
import { observationGoalEventType, observationGoalStreamRootValue } from '../events/observation-goal';
import { AbstractMsConsumer } from './abstract.mc.consumer';

@Injectable()
export class ObservationGoalMultiChainConsumer extends AbstractMsConsumer {
    constructor(
        eventStoreService: EventStore,
        checkpointService: CheckpointService,
        multichainService: MultiChainService,
    ) {
        super(
            `${observationGoalStreamRootValue}`,
            `sync-${observationGoalStreamRootValue}-multichain`,
            eventStoreService,
            checkpointService,
            multichainService,
        );
    }

    async publishToEventStore(eventMessage: ESEvent): Promise<void> {
        const event: Event = observationGoalEventType.getEvent(eventMessage);

        let result;
        if (event) {
            result = await this.eventStoreService.createEvent(event.toEventMessage());
        }

        return result;
    }
}
