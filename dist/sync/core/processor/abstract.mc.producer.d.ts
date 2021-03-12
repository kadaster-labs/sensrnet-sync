import { Logger, OnModuleInit } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { Event } from '../events/event';
export declare class AbstractMultiChainProducer implements OnModuleInit {
    private readonly streamName;
    private readonly multichainService;
    private addresses;
    private retryMechanism;
    protected logger: Logger;
    constructor(streamName: string, multichainService: MultiChainService);
    private inSupportedAggregateCreationEvents;
    publishEvent(event: Event): Promise<void>;
    onModuleInit(): Promise<void>;
}
