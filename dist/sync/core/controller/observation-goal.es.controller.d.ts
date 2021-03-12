import { ObservationGoalEsListener } from '../processor/observation-goal.es.listener';
import { AbstractESController } from './abstract.es.controller';
export declare class ObservationGoalEsController extends AbstractESController {
    constructor(eventStoreListener: ObservationGoalEsListener);
}
