import { Logger, OnModuleInit } from '@nestjs/common';
import { EventStore } from '../../eventstore/event-store';
import { AbstractEventType } from '../events/abstract-event-type';
import { AbstractMultiChainProducer } from './abstract.mc.producer';
import { EventStoreCatchUpSubscription } from 'node-eventstore-client';
import { CheckpointService } from '../../checkpoint/checkpoint.service';
export declare abstract class AbstractESListener implements OnModuleInit {
    protected readonly streamName: string;
    protected readonly checkpointId: string;
    protected readonly eventType: AbstractEventType;
    protected readonly eventStoreService: EventStore;
    protected readonly checkpointService: CheckpointService;
    protected readonly multichainProducer: AbstractMultiChainProducer;
    private subscription;
    protected logger: Logger;
    protected constructor(streamName: string, checkpointId: string, eventType: AbstractEventType, eventStoreService: EventStore, checkpointService: CheckpointService, multichainProducer: AbstractMultiChainProducer);
    getSubscription(): EventStoreCatchUpSubscription;
    setSubscription(subscription: EventStoreCatchUpSubscription): void;
    subscriptionExists(): boolean;
    closeSubscription(): void;
    openSubscription(): Promise<void>;
    getOffset(): Promise<number>;
    setOffset(offset: number): Promise<void>;
    subscribeToStreamFromLastOffset(): Promise<void>;
    onModuleInit(): Promise<void>;
}
