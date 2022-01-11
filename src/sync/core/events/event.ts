import { Exclude, Expose } from 'class-transformer';
import { EventMessage } from './event-message';

@Exclude()
export abstract class Event {
    public readonly version: string;

    @Expose() public eventType: string;

    @Expose() public readonly aggregateId: string;

    protected constructor(aggregateId: string, version: string) {
        this.aggregateId = aggregateId;
        this.version = version;
    }

    setEventType(eventType: string): void {
        this.eventType = eventType;
    }

    abstract streamRoot(): string;

    @Expose() toEventMessage(): EventMessage {
        const { version, ...eventData } = this;

        return new EventMessage(`${this.streamRoot()}-${this.aggregateId}`, this.constructor.name, eventData, {
            version,
            originSync: true,
        });
    }
}
