"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceLocatedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const device_located_v1_event_1 = require("./device-located-v1.event");
var device_located_v1_event_2 = require("./device-located-v1.event");
Object.defineProperty(exports, "DeviceLocated", { enumerable: true, get: function () { return device_located_v1_event_2.DeviceLocated; } });
function getDeviceLocatedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === device_located_v1_event_1.DeviceLocated.version ? class_transformer_1.plainToClass(device_located_v1_event_1.DeviceLocated, eventMessage.data) : null;
}
exports.getDeviceLocatedEvent = getDeviceLocatedEvent;
//# sourceMappingURL=index.js.map