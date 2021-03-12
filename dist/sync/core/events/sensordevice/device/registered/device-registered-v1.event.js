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
var DeviceRegistered_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRegistered = void 0;
const class_transformer_1 = require("class-transformer");
const sensordevice_event_1 = require("../../sensordevice.event");
let DeviceRegistered = DeviceRegistered_1 = class DeviceRegistered extends sensordevice_event_1.SensorDeviceEvent {
    constructor(deviceId, legalEntityId, name, description, category, connectivity) {
        super(deviceId, DeviceRegistered_1.version);
        this.legalEntityId = legalEntityId;
        this.name = name;
        this.description = description;
        this.category = category;
        this.connectivity = connectivity;
    }
};
DeviceRegistered.version = '1';
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceRegistered.prototype, "legalEntityId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceRegistered.prototype, "name", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceRegistered.prototype, "description", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceRegistered.prototype, "category", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceRegistered.prototype, "connectivity", void 0);
DeviceRegistered = DeviceRegistered_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String, String, String, String, String])
], DeviceRegistered);
exports.DeviceRegistered = DeviceRegistered;
//# sourceMappingURL=device-registered-v1.event.js.map