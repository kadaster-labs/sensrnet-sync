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
exports.AbstractESController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const offset_body_1 = require("./model/offset-body");
class AbstractESController {
    constructor(eventStoreListener) {
        this.eventStoreListener = eventStoreListener;
    }
    async openEventStoreSubscription() {
        await this.eventStoreListener.openSubscription();
    }
    async closeEventStoreSubscription() {
        this.eventStoreListener.closeSubscription();
    }
    async retrieveEventStoreOffset() {
        return this.eventStoreListener.getOffset();
    }
    async setEventStoreOffset(body) {
        await this.eventStoreListener.setOffset(body.offset);
    }
}
__decorate([
    common_1.Post('subscription/open'),
    swagger_1.ApiOperation({ summary: 'Open subscription' }),
    swagger_1.ApiResponse({ status: 200, description: 'Subscription opened' }),
    swagger_1.ApiResponse({ status: 400, description: 'Failed to open subscription' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AbstractESController.prototype, "openEventStoreSubscription", null);
__decorate([
    common_1.Post('subscription/close'),
    swagger_1.ApiOperation({ summary: 'Close subscription' }),
    swagger_1.ApiResponse({ status: 200, description: 'Subscription closed' }),
    swagger_1.ApiResponse({ status: 400, description: 'Failed to close subscription' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AbstractESController.prototype, "closeEventStoreSubscription", null);
__decorate([
    common_1.Get('checkpoint'),
    swagger_1.ApiOperation({ summary: 'Retrieve checkpoint offset' }),
    swagger_1.ApiResponse({ status: 200, description: 'Checkpoint offset retrieved' }),
    swagger_1.ApiResponse({ status: 400, description: 'Failed to retrieve Checkpoint offset' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AbstractESController.prototype, "retrieveEventStoreOffset", null);
__decorate([
    common_1.Post('checkpoint'),
    swagger_1.ApiOperation({ summary: 'Set checkpoint offset' }),
    swagger_1.ApiResponse({ status: 200, description: 'Checkpoint offset set' }),
    swagger_1.ApiResponse({ status: 400, description: 'Failed to set Checkpoint offset' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offset_body_1.OffsetBody]),
    __metadata("design:returntype", Promise)
], AbstractESController.prototype, "setEventStoreOffset", null);
exports.AbstractESController = AbstractESController;
//# sourceMappingURL=abstract.es.controller.js.map