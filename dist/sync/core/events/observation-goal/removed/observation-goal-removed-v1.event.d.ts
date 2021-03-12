import { ObservationGoalEvent } from '../observation-goal.event';
export declare class ObservationGoalRemoved extends ObservationGoalEvent {
    static version: string;
    readonly observationGoalId: string;
    readonly legalEntityId: string;
    constructor(observationGoalId: string, legalEntityId: string);
}
