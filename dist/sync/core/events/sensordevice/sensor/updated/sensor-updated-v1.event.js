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
var SensorUpdated_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorUpdated = void 0;
const class_transformer_1 = require("class-transformer");
const sensordevice_event_1 = require("../../sensordevice.event");
let SensorUpdated = SensorUpdated_1 = class SensorUpdated extends sensordevice_event_1.SensorDeviceEvent {
    constructor(deviceId, sensorId, legalEntityId, name, description, type, manufacturer, supplier, documentation) {
        super(deviceId, SensorUpdated_1.version);
        this.sensorId = sensorId;
        this.legalEntityId = legalEntityId;
        this.name = name;
        this.description = description;
        this.type = type;
        this.manufacturer = manufacturer;
        this.supplier = supplier;
        this.documentation = documentation;
    }
};
SensorUpdated.version = '1';
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorUpdated.prototype, "sensorId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorUpdated.prototype, "legalEntityId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorUpdated.prototype, "name", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorUpdated.prototype, "description", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorUpdated.prototype, "type", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorUpdated.prototype, "manufacturer", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorUpdated.prototype, "supplier", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorUpdated.prototype, "documentation", void 0);
SensorUpdated = SensorUpdated_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String])
], SensorUpdated);
exports.SensorUpdated = SensorUpdated;
//# sourceMappingURL=sensor-updated-v1.event.js.map