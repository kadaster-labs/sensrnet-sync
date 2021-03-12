import { Event } from './event';
import { Event as ESEvent } from 'geteventstore-promise';
export declare abstract class AbstractEventType {
    supportedTypes: Record<string, any>;
    getEvent(eventTypeName: ESEvent): Event;
    add(eventClass: Record<string, any>, upcastFn: (eventMessage: any) => Event): void;
}
