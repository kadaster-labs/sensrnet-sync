import { Event } from '../event';
export declare abstract class LegalEntityEvent extends Event {
    protected constructor(legalEntityId: string, version: string);
    streamRoot(): string;
}
