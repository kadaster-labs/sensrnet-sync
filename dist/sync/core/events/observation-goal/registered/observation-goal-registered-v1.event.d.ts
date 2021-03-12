import { ObservationGoalEvent } from '../observation-goal.event';
export declare class ObservationGoalRegistered extends ObservationGoalEvent {
    static version: string;
    readonly observationGoalId: string;
    readonly legalEntityId: string;
    readonly name: string;
    readonly description: string;
    readonly legalGround: string;
    readonly legalGroundLink: string;
    constructor(observationGoalId: string, legalEntityId: string, name: string, description: string, legalGround: string, legalGroundLink: string);
}
