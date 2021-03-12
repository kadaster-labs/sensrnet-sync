"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSensorAddedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const sensor_added_v1_event_1 = require("./sensor-added-v1.event");
var sensor_added_v1_event_2 = require("./sensor-added-v1.event");
Object.defineProperty(exports, "SensorAdded", { enumerable: true, get: function () { return sensor_added_v1_event_2.SensorAdded; } });
function getSensorAddedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === sensor_added_v1_event_1.SensorAdded.version ? class_transformer_1.plainToClass(sensor_added_v1_event_1.SensorAdded, eventMessage.data) : null;
}
exports.getSensorAddedEvent = getSensorAddedEvent;
//# sourceMappingURL=index.js.map