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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservationGoalEsListener = void 0;
const common_1 = require("@nestjs/common");
const checkpoint_service_1 = require("../../checkpoint/checkpoint.service");
const event_store_1 = require("../../eventstore/event-store");
const observation_goal_1 = require("../events/observation-goal");
const abstract_es_listener_1 = require("./abstract.es.listener");
const observation_goal_mc_producer_1 = require("./observation-goal.mc.producer");
let ObservationGoalEsListener = class ObservationGoalEsListener extends abstract_es_listener_1.AbstractESListener {
    constructor(multichainProducer, eventStoreService, checkpointService) {
        super(`$ce-${observation_goal_1.observationGoalStreamRootValue}`, `sync-${observation_goal_1.observationGoalStreamRootValue}-es`, observation_goal_1.observationGoalEventType, eventStoreService, checkpointService, multichainProducer);
    }
};
ObservationGoalEsListener = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [observation_goal_mc_producer_1.ObservationGoalMultiChainProducer,
        event_store_1.EventStore,
        checkpoint_service_1.CheckpointService])
], ObservationGoalEsListener);
exports.ObservationGoalEsListener = ObservationGoalEsListener;
//# sourceMappingURL=observation-goal.es.listener.js.map