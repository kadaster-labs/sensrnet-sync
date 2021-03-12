"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckpointModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const checkpoint_service_1 = require("./checkpoint.service");
const checkpoint_model_1 = require("./models/checkpoint.model");
let CheckpointModule = class CheckpointModule {
};
CheckpointModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Checkpoint', schema: checkpoint_model_1.CheckpointSchema }]),
        ], providers: [
            checkpoint_service_1.CheckpointService,
        ], exports: [
            checkpoint_service_1.CheckpointService,
        ],
    })
], CheckpointModule);
exports.CheckpointModule = CheckpointModule;
//# sourceMappingURL=checkpoint.module.js.map