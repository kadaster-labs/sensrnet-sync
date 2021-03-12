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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMultiChainController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const offset_body_1 = require("./model/offset-body");
class AbstractMultiChainController {
    constructor(multichainConsumer) {
        this.multichainConsumer = multichainConsumer;
    }
    async retrieveMultichainOffset() {
        return this.multichainConsumer.getOffset();
    }
    async setMultichainOffset(body) {
        await this.multichainConsumer.setOffset(body.offset);
    }
}
__decorate([
    common_1.Get('checkpoint'),
    swagger_1.ApiOperation({ summary: 'Retrieve checkpoint offset' }),
    swagger_1.ApiResponse({ status: 200, description: 'Checkpoint offset retrieved' }),
    swagger_1.ApiResponse({ status: 400, description: 'Failed to retrieve Checkpoint offset' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AbstractMultiChainController.prototype, "retrieveMultichainOffset", null);
__decorate([
    common_1.Post('checkpoint'),
    swagger_1.ApiOperation({ summary: 'Set checkpoint offset' }),
    swagger_1.ApiResponse({ status: 200, description: 'Checkpoint offset set' }),
    swagger_1.ApiResponse({ status: 400, description: 'Failed to set Checkpoint offset' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offset_body_1.OffsetBody]),
    __metadata("design:returntype", Promise)
], AbstractMultiChainController.prototype, "setMultichainOffset", null);
exports.AbstractMultiChainController = AbstractMultiChainController;
//# sourceMappingURL=abstract.ms.controller.js.map