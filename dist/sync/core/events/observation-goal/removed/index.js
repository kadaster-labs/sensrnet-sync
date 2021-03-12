"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObservationGoalRemovedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const observation_goal_removed_v1_event_1 = require("./observation-goal-removed-v1.event");
var observation_goal_removed_v1_event_2 = require("./observation-goal-removed-v1.event");
Object.defineProperty(exports, "ObservationGoalRemoved", { enumerable: true, get: function () { return observation_goal_removed_v1_event_2.ObservationGoalRemoved; } });
function getObservationGoalRemovedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === observation_goal_removed_v1_event_1.ObservationGoalRemoved.version ? class_transformer_1.plainToClass(observation_goal_removed_v1_event_1.ObservationGoalRemoved, eventMessage.data) : null;
}
exports.getObservationGoalRemovedEvent = getObservationGoalRemovedEvent;
//# sourceMappingURL=index.js.map