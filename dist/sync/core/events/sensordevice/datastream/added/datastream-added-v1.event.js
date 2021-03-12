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
var DatastreamAdded_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatastreamAdded = void 0;
const class_transformer_1 = require("class-transformer");
const sensordevice_event_1 = require("../../sensordevice.event");
let DatastreamAdded = DatastreamAdded_1 = class DatastreamAdded extends sensordevice_event_1.SensorDeviceEvent {
    constructor(sensorDeviceId, sensorId, legalEntityId, dataStreamId, name, description, unitOfMeasurement, observationArea, theme, dataQuality, isActive, isPublic, isOpenData, containsPersonalInfoData, isReusable, documentation, dataLink) {
        super(sensorDeviceId, DatastreamAdded_1.version);
        this.sensorId = sensorId;
        this.legalEntityId = legalEntityId;
        this.dataStreamId = dataStreamId;
        this.name = name;
        this.description = description;
        this.unitOfMeasurement = unitOfMeasurement;
        this.observationArea = observationArea;
        this.theme = theme;
        this.dataQuality = dataQuality;
        this.isActive = isActive;
        this.isPublic = isPublic;
        this.isOpenData = isOpenData;
        this.containsPersonalInfoData = containsPersonalInfoData;
        this.isReusable = isReusable;
        this.documentation = documentation;
        this.dataLink = dataLink;
    }
};
DatastreamAdded.version = '1';
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DatastreamAdded.prototype, "sensorId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DatastreamAdded.prototype, "legalEntityId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DatastreamAdded.prototype, "dataStreamId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DatastreamAdded.prototype, "name", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DatastreamAdded.prototype, "description", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Object)
], DatastreamAdded.prototype, "unitOfMeasurement", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Object)
], DatastreamAdded.prototype, "observationArea", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Array)
], DatastreamAdded.prototype, "theme", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DatastreamAdded.prototype, "dataQuality", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], DatastreamAdded.prototype, "isActive", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], DatastreamAdded.prototype, "isPublic", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], DatastreamAdded.prototype, "isOpenData", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], DatastreamAdded.prototype, "containsPersonalInfoData", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], DatastreamAdded.prototype, "isReusable", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DatastreamAdded.prototype, "documentation", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DatastreamAdded.prototype, "dataLink", void 0);
DatastreamAdded = DatastreamAdded_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Object, Object, Array, String, Boolean, Boolean, Boolean, Boolean, Boolean, String, String])
], DatastreamAdded);
exports.DatastreamAdded = DatastreamAdded;
//# sourceMappingURL=datastream-added-v1.event.js.map