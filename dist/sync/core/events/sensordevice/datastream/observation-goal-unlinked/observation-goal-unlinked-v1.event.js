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
var ObservationGoalUnlinked_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservationGoalUnlinked = void 0;
const class_transformer_1 = require("class-transformer");
const sensordevice_event_1 = require("../../sensordevice.event");
let ObservationGoalUnlinked = ObservationGoalUnlinked_1 = class ObservationGoalUnlinked extends sensordevice_event_1.SensorDeviceEvent {
    constructor(sensorDeviceId, sensorId, legalEntityId, datastreamId, observationGoalId) {
        super(sensorDeviceId, ObservationGoalUnlinked_1.version);
        this.sensorId = sensorId;
        this.legalEntityId = legalEntityId;
        this.dataStreamId = datastreamId;
        this.observationGoalId = observationGoalId;
    }
};
ObservationGoalUnlinked.version = '1';
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalUnlinked.prototype, "sensorId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalUnlinked.prototype, "legalEntityId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalUnlinked.prototype, "dataStreamId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalUnlinked.prototype, "observationGoalId", void 0);
ObservationGoalUnlinked = ObservationGoalUnlinked_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String, String, String, String])
], ObservationGoalUnlinked);
exports.ObservationGoalUnlinked = ObservationGoalUnlinked;
//# sourceMappingURL=observation-goal-unlinked-v1.event.js.map