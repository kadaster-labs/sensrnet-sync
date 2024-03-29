import { Logger } from '@nestjs/common';
import { Event as ESEvent } from 'geteventstore-promise';
import { Event } from './event';

export abstract class AbstractEventType {
    protected logger: Logger = new Logger(this.constructor.name);

    public supportedTypes: Record<string, any> = {};

    getEvent(eventTypeName: ESEvent): Event {
        const upcastFn = this.supportedTypes[eventTypeName.eventType];

        const event = upcastFn ? upcastFn(eventTypeName) : undefined;
        if (!event) {
            this.logger.warn(`Unsupported event received! eventType: ${eventTypeName.eventType}`);
        }

        return event;
    }

    public add(eventClass: Record<string, any>, upcastFn: (eventMessage) => Event): void {
        this.supportedTypes[eventClass.name] = upcastFn;
    }
}
