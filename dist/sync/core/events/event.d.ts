import { EventMessage } from './event-message';
export declare abstract class Event {
    readonly version: string;
    readonly aggregateId: string;
    readonly eventType: string;
    protected constructor(aggregateId: string, version: string);
    abstract streamRoot(): string;
    toEventMessage(): EventMessage;
}
