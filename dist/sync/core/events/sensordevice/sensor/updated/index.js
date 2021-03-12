"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSensorUpdatedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const sensor_updated_v1_event_1 = require("./sensor-updated-v1.event");
var sensor_updated_v1_event_2 = require("./sensor-updated-v1.event");
Object.defineProperty(exports, "SensorUpdated", { enumerable: true, get: function () { return sensor_updated_v1_event_2.SensorUpdated; } });
function getSensorUpdatedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === sensor_updated_v1_event_1.SensorUpdated.version ? class_transformer_1.plainToClass(sensor_updated_v1_event_1.SensorUpdated, eventMessage.data) : null;
}
exports.getSensorUpdatedEvent = getSensorUpdatedEvent;
//# sourceMappingURL=index.js.map