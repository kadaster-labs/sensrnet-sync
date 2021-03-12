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
exports.LegalEntityEvent = void 0;
const class_transformer_1 = require("class-transformer");
const event_1 = require("../event");
const legal_entity_stream_1 = require("./legal-entity.stream");
let LegalEntityEvent = class LegalEntityEvent extends event_1.Event {
    constructor(legalEntityId, version) {
        super(legalEntityId, version);
    }
    streamRoot() {
        return legal_entity_stream_1.legalEntityStreamRootValue;
    }
};
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], LegalEntityEvent.prototype, "streamRoot", null);
LegalEntityEvent = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String])
], LegalEntityEvent);
exports.LegalEntityEvent = LegalEntityEvent;
//# sourceMappingURL=legal-entity.event.js.map