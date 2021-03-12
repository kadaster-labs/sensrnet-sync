"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observationGoalEventType = void 0;
const abstract_event_type_1 = require("../abstract-event-type");
const registered_1 = require("./registered");
const removed_1 = require("./removed");
const updated_1 = require("./updated");
class ObservationGoalEventType extends abstract_event_type_1.AbstractEventType {
    constructor() {
        super();
        this.add(registered_1.ObservationGoalRegistered, registered_1.getObservationGoalRegisteredEvent);
        this.add(updated_1.ObservationGoalUpdated, updated_1.getObservationGoalUpdatedEvent);
        this.add(removed_1.ObservationGoalRemoved, removed_1.getObservationGoalRemovedEvent);
    }
}
exports.observationGoalEventType = new ObservationGoalEventType();
//# sourceMappingURL=observation-goal-event-type.js.map