import { plainToClass } from 'class-transformer';
import { EventMessage } from '../../../event-message';
import { ObservationGoalUnlinked as V1 } from './observation-goal-unlinked-v1.event';

export { ObservationGoalUnlinked } from './observation-goal-unlinked-v1.event';

export function getObservationGoalUnlinkedEvent(eventMessage: EventMessage): V1 {
    return !eventMessage.metadata.version || eventMessage.metadata.version === V1.version
        ? plainToClass(V1, eventMessage.data)
        : null;
}
