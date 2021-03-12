"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceUpdatedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const device_updated_v1_event_1 = require("./device-updated-v1.event");
var device_updated_v1_event_2 = require("./device-updated-v1.event");
Object.defineProperty(exports, "DeviceUpdated", { enumerable: true, get: function () { return device_updated_v1_event_2.DeviceUpdated; } });
function getDeviceUpdatedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === device_updated_v1_event_1.DeviceUpdated.version ? class_transformer_1.plainToClass(device_updated_v1_event_1.DeviceUpdated, eventMessage.data) : null;
}
exports.getDeviceUpdatedEvent = getDeviceUpdatedEvent;
//# sourceMappingURL=index.js.map