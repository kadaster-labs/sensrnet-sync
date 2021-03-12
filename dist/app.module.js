"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const terminus_1 = require("@nestjs/terminus");
const core_module_1 = require("./sync/core/core.module");
const checkpoint_module_1 = require("./sync/checkpoint/checkpoint.module");
const multichain_module_1 = require("./sync/multichain/multichain.module");
const health_controller_1 = require("./health/health.controller");
const port = process.env.MONGO_PORT || 27017;
const host = process.env.MONGO_HOST || 'localhost';
const database = process.env.MONGO_DATABASE || 'sensrnet';
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            multichain_module_1.MultiChainModule,
            checkpoint_module_1.CheckpointModule,
            core_module_1.CoreModule,
            mongoose_1.MongooseModule.forRoot(`mongodb://${host}:${port}/${database}`),
            terminus_1.TerminusModule,
        ],
        controllers: [health_controller_1.HealthController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map