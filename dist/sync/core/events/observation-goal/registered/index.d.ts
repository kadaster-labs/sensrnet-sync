import { EventMessage } from '../../event-message';
import { ObservationGoalRegistered as V1 } from './observation-goal-registered-v1.event';
export { ObservationGoalRegistered } from './observation-goal-registered-v1.event';
export declare function getObservationGoalRegisteredEvent(eventMessage: EventMessage): V1;
