"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceRelocatedAtBaseObjectEvent = void 0;
const class_transformer_1 = require("class-transformer");
const device_relocated_at_base_v1_event_1 = require("./device-relocated-at-base-v1.event");
var device_relocated_at_base_v1_event_2 = require("./device-relocated-at-base-v1.event");
Object.defineProperty(exports, "DeviceRelocatedAtBaseObject", { enumerable: true, get: function () { return device_relocated_at_base_v1_event_2.DeviceRelocatedAtBaseObject; } });
function getDeviceRelocatedAtBaseObjectEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === device_relocated_at_base_v1_event_1.DeviceRelocatedAtBaseObject.version ? class_transformer_1.plainToClass(device_relocated_at_base_v1_event_1.DeviceRelocatedAtBaseObject, eventMessage.data) : null;
}
exports.getDeviceRelocatedAtBaseObjectEvent = getDeviceRelocatedAtBaseObjectEvent;
//# sourceMappingURL=index.js.map