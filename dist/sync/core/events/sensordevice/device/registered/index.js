"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceRegisteredEvent = void 0;
const class_transformer_1 = require("class-transformer");
const device_registered_v1_event_1 = require("./device-registered-v1.event");
var device_registered_v1_event_2 = require("./device-registered-v1.event");
Object.defineProperty(exports, "DeviceRegistered", { enumerable: true, get: function () { return device_registered_v1_event_2.DeviceRegistered; } });
function getDeviceRegisteredEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === device_registered_v1_event_1.DeviceRegistered.version ? class_transformer_1.plainToClass(device_registered_v1_event_1.DeviceRegistered, eventMessage.data) : null;
}
exports.getDeviceRegisteredEvent = getDeviceRegisteredEvent;
//# sourceMappingURL=index.js.map