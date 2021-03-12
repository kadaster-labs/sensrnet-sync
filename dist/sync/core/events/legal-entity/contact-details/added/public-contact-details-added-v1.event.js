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
var PublicContactDetailsAdded_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicContactDetailsAdded = void 0;
const class_transformer_1 = require("class-transformer");
const legal_entity_event_1 = require("../../legal-entity.event");
let PublicContactDetailsAdded = PublicContactDetailsAdded_1 = class PublicContactDetailsAdded extends legal_entity_event_1.LegalEntityEvent {
    constructor(legalEntityId, contactDetailsId, name, email, phone) {
        super(legalEntityId, PublicContactDetailsAdded_1.version);
        this.legalEntityId = legalEntityId;
        this.contactDetailsId = contactDetailsId;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
};
PublicContactDetailsAdded.version = '1';
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], PublicContactDetailsAdded.prototype, "legalEntityId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], PublicContactDetailsAdded.prototype, "contactDetailsId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], PublicContactDetailsAdded.prototype, "name", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], PublicContactDetailsAdded.prototype, "email", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], PublicContactDetailsAdded.prototype, "phone", void 0);
PublicContactDetailsAdded = PublicContactDetailsAdded_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String, String, String, String])
], PublicContactDetailsAdded);
exports.PublicContactDetailsAdded = PublicContactDetailsAdded;
//# sourceMappingURL=public-contact-details-added-v1.event.js.map