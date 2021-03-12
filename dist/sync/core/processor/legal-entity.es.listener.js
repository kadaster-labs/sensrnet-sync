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
exports.LegalEntityEsListener = void 0;
const common_1 = require("@nestjs/common");
const checkpoint_service_1 = require("../../checkpoint/checkpoint.service");
const event_store_1 = require("../../eventstore/event-store");
const legal_entity_1 = require("../events/legal-entity");
const abstract_es_listener_1 = require("./abstract.es.listener");
const legal_entity_mc_producer_1 = require("./legal-entity.mc.producer");
let LegalEntityEsListener = class LegalEntityEsListener extends abstract_es_listener_1.AbstractESListener {
    constructor(multichainProducer, eventStoreService, checkpointService) {
        super(`$ce-${legal_entity_1.legalEntityStreamRootValue}`, `sync-${legal_entity_1.legalEntityStreamRootValue}-es`, legal_entity_1.legalEntityEventType, eventStoreService, checkpointService, multichainProducer);
    }
};
LegalEntityEsListener = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [legal_entity_mc_producer_1.LegalEntityMultiChainProducer,
        event_store_1.EventStore,
        checkpoint_service_1.CheckpointService])
], LegalEntityEsListener);
exports.LegalEntityEsListener = LegalEntityEsListener;
//# sourceMappingURL=legal-entity.es.listener.js.map