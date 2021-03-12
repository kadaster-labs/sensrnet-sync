import { CheckpointService } from '../../checkpoint/checkpoint.service';
import { EventStore } from '../../eventstore/event-store';
import { AbstractESListener } from './abstract.es.listener';
import { SensorDeviceMultiChainProducer } from './sensordevice.mc.producer';
export declare class SensorDeviceESListener extends AbstractESListener {
    constructor(multichainProducer: SensorDeviceMultiChainProducer, eventStoreService: EventStore, checkpointService: CheckpointService);
}
