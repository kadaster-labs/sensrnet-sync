"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceLocatedAtBaseObjectEvent = void 0;
const class_transformer_1 = require("class-transformer");
const device_located_at_base_v1_event_1 = require("./device-located-at-base-v1.event");
var device_located_at_base_v1_event_2 = require("./device-located-at-base-v1.event");
Object.defineProperty(exports, "DeviceLocatedAtBaseObject", { enumerable: true, get: function () { return device_located_at_base_v1_event_2.DeviceLocatedAtBaseObject; } });
function getDeviceLocatedAtBaseObjectEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === device_located_at_base_v1_event_1.DeviceLocatedAtBaseObject.version ? class_transformer_1.plainToClass(device_located_at_base_v1_event_1.DeviceLocatedAtBaseObject, eventMessage.data) : null;
}
exports.getDeviceLocatedAtBaseObjectEvent = getDeviceLocatedAtBaseObjectEvent;
//# sourceMappingURL=index.js.map