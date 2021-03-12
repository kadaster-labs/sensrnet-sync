"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSensorRemovedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const sensor_removed_v1_event_1 = require("./sensor-removed-v1.event");
var sensor_removed_v1_event_2 = require("./sensor-removed-v1.event");
Object.defineProperty(exports, "SensorRemoved", { enumerable: true, get: function () { return sensor_removed_v1_event_2.SensorRemoved; } });
function getSensorRemovedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === sensor_removed_v1_event_1.SensorRemoved.version ? class_transformer_1.plainToClass(sensor_removed_v1_event_1.SensorRemoved, eventMessage.data) : null;
}
exports.getSensorRemovedEvent = getSensorRemovedEvent;
//# sourceMappingURL=index.js.map