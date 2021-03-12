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
var DeviceLocatedAtBaseObject_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceLocatedAtBaseObject = void 0;
const class_transformer_1 = require("class-transformer");
const sensordevice_event_1 = require("../../sensordevice.event");
let DeviceLocatedAtBaseObject = DeviceLocatedAtBaseObject_1 = class DeviceLocatedAtBaseObject extends sensordevice_event_1.SensorDeviceEvent {
    constructor(deviceId, name, description, location, baseObjectId) {
        super(deviceId, DeviceLocatedAtBaseObject_1.version);
        this.name = name;
        this.description = description;
        this.location = location;
        this.baseObjectId = baseObjectId;
    }
};
DeviceLocatedAtBaseObject.version = '1';
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceLocatedAtBaseObject.prototype, "name", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceLocatedAtBaseObject.prototype, "description", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Array)
], DeviceLocatedAtBaseObject.prototype, "location", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceLocatedAtBaseObject.prototype, "baseObjectId", void 0);
DeviceLocatedAtBaseObject = DeviceLocatedAtBaseObject_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String, String, Array, String])
], DeviceLocatedAtBaseObject);
exports.DeviceLocatedAtBaseObject = DeviceLocatedAtBaseObject;
//# sourceMappingURL=device-located-at-base-v1.event.js.map