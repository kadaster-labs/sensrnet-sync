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
exports.ObservationGoalEsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const domain_exception_filter_1 = require("../errors/domain-exception.filter");
const observation_goal_es_listener_1 = require("../processor/observation-goal.es.listener");
const abstract_es_controller_1 = require("./abstract.es.controller");
let ObservationGoalEsController = class ObservationGoalEsController extends abstract_es_controller_1.AbstractESController {
    constructor(eventStoreListener) {
        super(eventStoreListener);
    }
};
ObservationGoalEsController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('ObservationGoalES'),
    common_1.Controller('ObservationGoalES'),
    common_1.UseFilters(new domain_exception_filter_1.DomainExceptionFilter()),
    __metadata("design:paramtypes", [observation_goal_es_listener_1.ObservationGoalEsListener])
], ObservationGoalEsController);
exports.ObservationGoalEsController = ObservationGoalEsController;
//# sourceMappingURL=observation-goal.es.controller.js.map