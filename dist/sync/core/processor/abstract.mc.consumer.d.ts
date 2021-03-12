import { Logger, OnModuleInit } from '@nestjs/common';
import { Event as ESEvent } from 'geteventstore-promise';
import { EventStore } from '../../eventstore/event-store';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { MultiChainService } from '../../multichain/multichain.service';
export declare abstract class AbstractMsConsumer implements OnModuleInit {
    private streamName;
    private checkpointId;
    protected readonly eventStoreService: EventStore;
    private readonly checkpointService;
    private readonly multichainService;
    private addresses;
    private loopInterval;
    private retryMechanism;
    protected logger: Logger;
    protected constructor(streamName: string, checkpointId: string, eventStoreService: EventStore, checkpointService: CheckpointService, multichainService: MultiChainService);
    getOffset(): Promise<number>;
    setOffset(offset: number): Promise<any>;
    abstract publishToEventStore(eventMessage: ESEvent): Promise<void>;
    listenerLoop(): Promise<void>;
    onModuleInit(): Promise<void>;
}
