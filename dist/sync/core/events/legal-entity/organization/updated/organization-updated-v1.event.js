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
var OrganizationUpdated_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationUpdated = void 0;
const class_transformer_1 = require("class-transformer");
const legal_entity_event_1 = require("../../legal-entity.event");
let OrganizationUpdated = OrganizationUpdated_1 = class OrganizationUpdated extends legal_entity_event_1.LegalEntityEvent {
    constructor(organizationId, name, website) {
        super(organizationId, OrganizationUpdated_1.version);
        this.name = name;
        this.website = website;
    }
};
OrganizationUpdated.version = '1';
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], OrganizationUpdated.prototype, "name", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], OrganizationUpdated.prototype, "website", void 0);
OrganizationUpdated = OrganizationUpdated_1 = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String, String])
], OrganizationUpdated);
exports.OrganizationUpdated = OrganizationUpdated;
//# sourceMappingURL=organization-updated-v1.event.js.map