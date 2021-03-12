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
exports.LegalEntityEsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const domain_exception_filter_1 = require("../errors/domain-exception.filter");
const legal_entity_es_listener_1 = require("../processor/legal-entity.es.listener");
const abstract_es_controller_1 = require("./abstract.es.controller");
let LegalEntityEsController = class LegalEntityEsController extends abstract_es_controller_1.AbstractESController {
    constructor(eventStoreListener) {
        super(eventStoreListener);
    }
};
LegalEntityEsController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('LegalEntityES'),
    common_1.Controller('LegalEntityES'),
    common_1.UseFilters(new domain_exception_filter_1.DomainExceptionFilter()),
    __metadata("design:paramtypes", [legal_entity_es_listener_1.LegalEntityEsListener])
], LegalEntityEsController);
exports.LegalEntityEsController = LegalEntityEsController;
//# sourceMappingURL=legal-entity.es.controller.js.map