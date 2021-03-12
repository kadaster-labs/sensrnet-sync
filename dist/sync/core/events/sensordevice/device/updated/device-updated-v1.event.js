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
var DeviceUpdated_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceUpdated = void 0;
const class_transformer_1 = require("class-transformer");
const sensordevice_event_1 = require("../../sensordevice.event");
let DeviceUpdated = DeviceUpdated_1 = class DeviceUpdated extends sensordevice_event_1.SensorDeviceEvent {
    constructor(deviceId, legalEntityId, name, description, category, connectivity) {
        super(deviceId, DeviceUpdated_1.version);
        this.legalEntityId = legalEntityId;
        this.name = name;
        this.description = description;
        this.category = category;
        this.connectivity = connectivity;
    }
};
DeviceUpdated.version = '1';
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceUpdated.prototype, "legalEntityId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceUpdated.prototype, "name", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceUpdated.prototype, "description", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceUpdated.prototype, "category", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DeviceUpdated.prototype, "connectivity", void 0);
DeviceUpdated = DeviceUpdated_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String, String, String, String, String])
], DeviceUpdated);
exports.DeviceUpdated = DeviceUpdated;
//# sourceMappingURL=device-updated-v1.event.js.map