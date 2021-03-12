"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObservationGoalUpdatedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const observation_goal_updated_v1_event_1 = require("./observation-goal-updated-v1.event");
var observation_goal_updated_v1_event_2 = require("./observation-goal-updated-v1.event");
Object.defineProperty(exports, "ObservationGoalUpdated", { enumerable: true, get: function () { return observation_goal_updated_v1_event_2.ObservationGoalUpdated; } });
function getObservationGoalUpdatedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === observation_goal_updated_v1_event_1.ObservationGoalUpdated.version ? class_transformer_1.plainToClass(observation_goal_updated_v1_event_1.ObservationGoalUpdated, eventMessage.data) : null;
}
exports.getObservationGoalUpdatedEvent = getObservationGoalUpdatedEvent;
//# sourceMappingURL=index.js.map