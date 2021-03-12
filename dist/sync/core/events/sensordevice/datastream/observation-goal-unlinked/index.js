"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObservationGoalUnlinkedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const observation_goal_unlinked_v1_event_1 = require("./observation-goal-unlinked-v1.event");
var observation_goal_unlinked_v1_event_2 = require("./observation-goal-unlinked-v1.event");
Object.defineProperty(exports, "ObservationGoalUnlinked", { enumerable: true, get: function () { return observation_goal_unlinked_v1_event_2.ObservationGoalUnlinked; } });
function getObservationGoalUnlinkedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === observation_goal_unlinked_v1_event_1.ObservationGoalUnlinked.version ? class_transformer_1.plainToClass(observation_goal_unlinked_v1_event_1.ObservationGoalUnlinked, eventMessage.data) : null;
}
exports.getObservationGoalUnlinkedEvent = getObservationGoalUnlinkedEvent;
//# sourceMappingURL=index.js.map