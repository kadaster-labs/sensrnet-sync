"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceRemovedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const device_removed_v1_event_1 = require("./device-removed-v1.event");
var device_removed_v1_event_2 = require("./device-removed-v1.event");
Object.defineProperty(exports, "DeviceRemoved", { enumerable: true, get: function () { return device_removed_v1_event_2.DeviceRemoved; } });
function getDeviceRemovedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === device_removed_v1_event_1.DeviceRemoved.version ? class_transformer_1.plainToClass(device_removed_v1_event_1.DeviceRemoved, eventMessage.data) : null;
}
exports.getDeviceRemovedEvent = getDeviceRemovedEvent;
//# sourceMappingURL=index.js.map