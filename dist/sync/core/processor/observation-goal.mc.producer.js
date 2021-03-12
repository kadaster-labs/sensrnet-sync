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
exports.ObservationGoalMultiChainProducer = void 0;
const common_1 = require("@nestjs/common");
const multichain_service_1 = require("../../multichain/multichain.service");
const observation_goal_1 = require("../events/observation-goal");
const abstract_mc_producer_1 = require("./abstract.mc.producer");
let ObservationGoalMultiChainProducer = class ObservationGoalMultiChainProducer extends abstract_mc_producer_1.AbstractMultiChainProducer {
    constructor(multichainService) {
        super(`${observation_goal_1.observationGoalStreamRootValue}`, multichainService);
    }
};
ObservationGoalMultiChainProducer = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [multichain_service_1.MultiChainService])
], ObservationGoalMultiChainProducer);
exports.ObservationGoalMultiChainProducer = ObservationGoalMultiChainProducer;
//# sourceMappingURL=observation-goal.mc.producer.js.map