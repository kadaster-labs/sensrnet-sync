import { Event } from '../event';
export declare abstract class ObservationGoalEvent extends Event {
    static streamRootValue: string;
    protected constructor(observationGoalId: string, version: string);
    streamRoot(): string;
}
