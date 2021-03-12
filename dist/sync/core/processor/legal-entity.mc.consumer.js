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
exports.LegalEntityMultiChainConsumer = void 0;
const common_1 = require("@nestjs/common");
const checkpoint_service_1 = require("../../checkpoint/checkpoint.service");
const event_store_1 = require("../../eventstore/event-store");
const multichain_service_1 = require("../../multichain/multichain.service");
const legal_entity_1 = require("../events/legal-entity");
const abstract_mc_consumer_1 = require("./abstract.mc.consumer");
let LegalEntityMultiChainConsumer = class LegalEntityMultiChainConsumer extends abstract_mc_consumer_1.AbstractMsConsumer {
    constructor(eventStoreService, checkpointService, multichainService) {
        super(`${legal_entity_1.legalEntityStreamRootValue}`, `sync-${legal_entity_1.legalEntityStreamRootValue}-multichain`, eventStoreService, checkpointService, multichainService);
    }
    async publishToEventStore(eventMessage) {
        const event = legal_entity_1.legalEntityEventType.getEvent(eventMessage);
        let result;
        if (event) {
            result = await this.eventStoreService.createEvent(event.toEventMessage());
        }
        return result;
    }
};
LegalEntityMultiChainConsumer = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [event_store_1.EventStore,
        checkpoint_service_1.CheckpointService,
        multichain_service_1.MultiChainService])
], LegalEntityMultiChainConsumer);
exports.LegalEntityMultiChainConsumer = LegalEntityMultiChainConsumer;
//# sourceMappingURL=legal-entity.mc.consumer.js.map