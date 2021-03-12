import { AbstractESListener } from '../processor/abstract.es.listener';
import { OffsetBody } from './model/offset-body';
export declare abstract class AbstractESController {
    private readonly eventStoreListener;
    protected constructor(eventStoreListener: AbstractESListener);
    openEventStoreSubscription(): Promise<void>;
    closeEventStoreSubscription(): Promise<void>;
    retrieveEventStoreOffset(): Promise<number>;
    setEventStoreOffset(body: OffsetBody): Promise<void>;
}
