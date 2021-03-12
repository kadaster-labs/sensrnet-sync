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
exports.SensorDeviceMultiChainController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const domain_exception_filter_1 = require("../errors/domain-exception.filter");
const sensordevice_mc_consumer_1 = require("../processor/sensordevice.mc.consumer");
const abstract_ms_controller_1 = require("./abstract.ms.controller");
let SensorDeviceMultiChainController = class SensorDeviceMultiChainController extends abstract_ms_controller_1.AbstractMultiChainController {
    constructor(multichainConsumer) {
        super(multichainConsumer);
    }
};
SensorDeviceMultiChainController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('SensorDeviceMC'),
    common_1.Controller('SensorDeviceMC'),
    common_1.UseFilters(new domain_exception_filter_1.DomainExceptionFilter()),
    __metadata("design:paramtypes", [sensordevice_mc_consumer_1.SensorDeviceMultiChainConsumer])
], SensorDeviceMultiChainController);
exports.SensorDeviceMultiChainController = SensorDeviceMultiChainController;
//# sourceMappingURL=sensordevice.mc.controller.js.map