import { Exclude, Expose } from 'class-transformer';
import { Event } from '../event';
import { observationGoalStreamRootValue } from './observation-goal.stream';

@Exclude()
export abstract class ObservationGoalEvent extends Event {
    static streamRootValue = observationGoalStreamRootValue;

    protected constructor(observationGoalId: string, version: string) {
        super(observationGoalId, version);
    }

    @Expose()
    streamRoot(): string {
        return ObservationGoalEvent.streamRootValue;
    }
}
