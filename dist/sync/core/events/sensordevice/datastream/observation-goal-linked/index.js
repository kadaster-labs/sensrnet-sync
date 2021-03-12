"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObservationGoalLinkedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const observation_goal_linked_v1_event_1 = require("./observation-goal-linked-v1.event");
var observation_goal_linked_v1_event_2 = require("./observation-goal-linked-v1.event");
Object.defineProperty(exports, "ObservationGoalLinked", { enumerable: true, get: function () { return observation_goal_linked_v1_event_2.ObservationGoalLinked; } });
function getObservationGoalLinkedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === observation_goal_linked_v1_event_1.ObservationGoalLinked.version ? class_transformer_1.plainToClass(observation_goal_linked_v1_event_1.ObservationGoalLinked, eventMessage.data) : null;
}
exports.getObservationGoalLinkedEvent = getObservationGoalLinkedEvent;
//# sourceMappingURL=index.js.map