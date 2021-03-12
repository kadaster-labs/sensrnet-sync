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
var ObservationGoalUpdated_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservationGoalUpdated = void 0;
const class_transformer_1 = require("class-transformer");
const observation_goal_event_1 = require("../observation-goal.event");
let ObservationGoalUpdated = ObservationGoalUpdated_1 = class ObservationGoalUpdated extends observation_goal_event_1.ObservationGoalEvent {
    constructor(observationGoalId, legalEntityId, name, description, legalGround, legalGroundLink) {
        super(observationGoalId, ObservationGoalUpdated_1.version);
        this.observationGoalId = observationGoalId;
        this.legalEntityId = legalEntityId;
        this.name = name;
        this.description = description;
        this.legalGround = legalGround;
        this.legalGroundLink = legalGroundLink;
    }
};
ObservationGoalUpdated.version = '1';
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalUpdated.prototype, "observationGoalId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalUpdated.prototype, "legalEntityId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalUpdated.prototype, "name", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalUpdated.prototype, "description", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalUpdated.prototype, "legalGround", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ObservationGoalUpdated.prototype, "legalGroundLink", void 0);
ObservationGoalUpdated = ObservationGoalUpdated_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String, String, String, String, String])
], ObservationGoalUpdated);
exports.ObservationGoalUpdated = ObservationGoalUpdated;
//# sourceMappingURL=observation-goal-updated-v1.event.js.map