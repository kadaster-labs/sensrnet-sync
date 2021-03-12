"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceRelocatedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const device_relocated_v1_event_1 = require("./device-relocated-v1.event");
var device_relocated_v1_event_2 = require("./device-relocated-v1.event");
Object.defineProperty(exports, "DeviceRelocated", { enumerable: true, get: function () { return device_relocated_v1_event_2.DeviceRelocated; } });
function getDeviceRelocatedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === device_relocated_v1_event_1.DeviceRelocated.version ? class_transformer_1.plainToClass(device_relocated_v1_event_1.DeviceRelocated, eventMessage.data) : null;
}
exports.getDeviceRelocatedEvent = getDeviceRelocatedEvent;
//# sourceMappingURL=index.js.map