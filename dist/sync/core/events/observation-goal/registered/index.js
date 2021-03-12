"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObservationGoalRegisteredEvent = void 0;
const class_transformer_1 = require("class-transformer");
const observation_goal_registered_v1_event_1 = require("./observation-goal-registered-v1.event");
var observation_goal_registered_v1_event_2 = require("./observation-goal-registered-v1.event");
Object.defineProperty(exports, "ObservationGoalRegistered", { enumerable: true, get: function () { return observation_goal_registered_v1_event_2.ObservationGoalRegistered; } });
function getObservationGoalRegisteredEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === observation_goal_registered_v1_event_1.ObservationGoalRegistered.version ? class_transformer_1.plainToClass(observation_goal_registered_v1_event_1.ObservationGoalRegistered, eventMessage.data) : null;
}
exports.getObservationGoalRegisteredEvent = getObservationGoalRegisteredEvent;
//# sourceMappingURL=index.js.map