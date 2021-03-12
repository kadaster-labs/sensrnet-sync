"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MultiChainModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiChainModule = void 0;
const common_1 = require("@nestjs/common");
const multichain_service_1 = require("./multichain.service");
const multichain_config_1 = require("../../multichain.config");
const multichain_controller_1 = require("./multichain.controller");
let MultiChainModule = MultiChainModule_1 = class MultiChainModule {
};
MultiChainModule = MultiChainModule_1 = __decorate([
    common_1.Module({
        imports: [
            MultiChainModule_1,
        ],
        controllers: [
            multichain_controller_1.MultiChainController,
        ],
        providers: [
            multichain_service_1.MultiChainService,
            multichain_config_1.MultiChainConfig,
        ],
        exports: [
            multichain_service_1.MultiChainService,
        ],
    })
], MultiChainModule);
exports.MultiChainModule = MultiChainModule;
//# sourceMappingURL=multichain.module.js.map