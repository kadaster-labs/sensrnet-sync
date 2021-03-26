import { Exclude, Expose } from 'class-transformer';
import { ObservationGoalEvent } from '../observation-goal.event';

@Exclude()
export class ObservationGoalRemoved extends ObservationGoalEvent {

  static version = '1';

  @Expose()
  readonly observationGoalId: string;

  @Expose()
  readonly legalEntityId: string;

  constructor(observationGoalId: string, legalEntityId: string) {
    super(observationGoalId, ObservationGoalRemoved.version);

    this.observationGoalId = observationGoalId;
    this.legalEntityId = legalEntityId;
  }
}
