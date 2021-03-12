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
var SensorAdded_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorAdded = void 0;
const class_transformer_1 = require("class-transformer");
const sensordevice_event_1 = require("../../sensordevice.event");
let SensorAdded = SensorAdded_1 = class SensorAdded extends sensordevice_event_1.SensorDeviceEvent {
    constructor(deviceId, sensorId, legalEntityId, name, description, type, manufacturer, supplier, documentation) {
        super(deviceId, SensorAdded_1.version);
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
SensorAdded.version = '1';
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorAdded.prototype, "sensorId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorAdded.prototype, "legalEntityId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorAdded.prototype, "name", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorAdded.prototype, "description", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorAdded.prototype, "type", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorAdded.prototype, "manufacturer", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorAdded.prototype, "supplier", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], SensorAdded.prototype, "documentation", void 0);
SensorAdded = SensorAdded_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String])
], SensorAdded);
exports.SensorAdded = SensorAdded;
//# sourceMappingURL=sensor-added-v1.event.js.map