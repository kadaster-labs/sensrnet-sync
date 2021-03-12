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
var ObservationGoalLinked_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservationGoalLinked = void 0;
const class_transformer_1 = require("class-transformer");
const sensordevice_event_1 = require("../../sensordevice.event");
let ObservationGoalLinked = ObservationGoalLinked_1 = class ObservationGoalLinked extends sensordevice_event_1.SensorDeviceEvent {
    constructor(sensorDeviceId, sensorId, legalEntityId, datastreamId, observationGoalId) {
        super(sensorDeviceId, ObservationGoalLinked_1.version);
        this.sensorId = sensorId;
        this.legalEntityId = legalEntityId;
        this.dataStreamId = datastreamId;
        this.observationGoalId = observationGoalId;
    }
};
ObservationGoalLinked.version = '1';
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalLinked.prototype, "sensorId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalLinked.prototype, "legalEntityId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalLinked.prototype, "dataStreamId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalLinked.prototype, "observationGoalId", void 0);
ObservationGoalLinked = ObservationGoalLinked_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String, String, String, String])
], ObservationGoalLinked);
exports.ObservationGoalLinked = ObservationGoalLinked;
//# sourceMappingURL=observation-goal-linked-v1.event.js.map