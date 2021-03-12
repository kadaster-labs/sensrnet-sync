"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SensorDeviceEvent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorDeviceEvent = void 0;
const class_transformer_1 = require("class-transformer");
const event_1 = require("../event");
const sensordevice_stream_1 = require("./sensordevice.stream");
let SensorDeviceEvent = SensorDeviceEvent_1 = class SensorDeviceEvent extends event_1.Event {
    constructor(sensorDeviceId, version) {
        super(sensorDeviceId, version);
        this.deviceId = sensorDeviceId;
    }
    streamRoot() {
        return SensorDeviceEvent_1.streamRootValue;
    }
};
SensorDeviceEvent.streamRootValue = sensordevice_stream_1.sensorDeviceStreamRootValue;
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorDeviceEvent.prototype, "deviceId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], SensorDeviceEvent.prototype, "streamRoot", null);
SensorDeviceEvent = SensorDeviceEvent_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String])
], SensorDeviceEvent);
exports.SensorDeviceEvent = SensorDeviceEvent;
//# sourceMappingURL=sensordevice.event.js.map