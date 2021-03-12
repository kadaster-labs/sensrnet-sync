import { Exclude, Expose } from 'class-transformer';
import { ObservationGoalEvent } from '../observation-goal.event';

@Exclude()
export class ObservationGoalUpdated extends ObservationGoalEvent {

  static version = '1';

  @Expose()
  readonly observationGoalId: string;

  @Expose()
  readonly legalEntityId: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly legalGround: string;

  @Expose()
  readonly legalGroundLink: string;

  constructor(observationGoalId: string, legalEntityId: string, name: string, description: string,
    legalGround: string, legalGroundLink: string) {
    super(observationGoalId, ObservationGoalUpdated.version);
    this.observationGoalId = observationGoalId;
    this.legalEntityId = legalEntityId;
    this.name = name;
    this.description = description;
    this.legalGround = legalGround;
    this.legalGroundLink = legalGroundLink;
  }

}
