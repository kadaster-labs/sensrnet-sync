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
exports.MultiChainController = void 0;
const grant_body_1 = require("./model/grant-body");
const stream_body_1 = require("./model/stream-body");
const approve_body_1 = require("./model/approve-body");
const multichain_service_1 = require("./multichain.service");
const transaction_body_1 = require("./model/transaction-body");
const common_1 = require("@nestjs/common");
const domain_exception_filter_1 = require("../core/errors/domain-exception.filter");
const swagger_1 = require("@nestjs/swagger");
const domain_exception_1 = require("../core/errors/domain-exception");
let MultiChainController = class MultiChainController {
    constructor(multiChainService) {
        this.multiChainService = multiChainService;
    }
    async retrieveAddresses() {
        try {
            return await this.multiChainService.getAddresses();
        }
        catch (e) {
            throw new domain_exception_1.DomainException(e.message);
        }
    }
    async grant(body) {
        try {
            return await this.multiChainService.grant(body.address, body.permissions);
        }
        catch (e) {
            throw new domain_exception_1.DomainException(e.message);
        }
    }
    async createStream(body) {
        try {
            return await this.multiChainService.createStream(body.name);
        }
        catch (e) {
            throw new domain_exception_1.DomainException(e.message);
        }
    }
    async createTransaction(body) {
        try {
            return await this.multiChainService.createTransaction(body.stream, body.key, body.data);
        }
        catch (e) {
            throw new domain_exception_1.DomainException(e.message);
        }
    }
    async approveFilter(body) {
        try {
            return await this.multiChainService.approveFrom(body.address, body.filterName, true);
        }
        catch (e) {
            throw new domain_exception_1.DomainException(e.message);
        }
    }
    async disapproveFilter(body) {
        try {
            return await this.multiChainService.approveFrom(body.address, body.filterName, false);
        }
        catch (e) {
            throw new domain_exception_1.DomainException(e.message);
        }
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'Retrieve Addresses' }),
    swagger_1.ApiResponse({ status: 200, description: 'Addresses retrieved' }),
    swagger_1.ApiResponse({ status: 400, description: 'Addresses retrieval failed' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MultiChainController.prototype, "retrieveAddresses", null);
__decorate([
    common_1.Post('grant'),
    swagger_1.ApiOperation({ summary: 'Grant Permission' }),
    swagger_1.ApiResponse({ status: 200, description: 'Permission granted' }),
    swagger_1.ApiResponse({ status: 400, description: 'Permission grant failed' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [grant_body_1.GrantBody]),
    __metadata("design:returntype", Promise)
], MultiChainController.prototype, "grant", null);
__decorate([
    common_1.Post('stream'),
    swagger_1.ApiOperation({ summary: 'Create Stream' }),
    swagger_1.ApiResponse({ status: 200, description: 'Stream created' }),
    swagger_1.ApiResponse({ status: 400, description: 'Stream creation failed' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stream_body_1.StreamBody]),
    __metadata("design:returntype", Promise)
], MultiChainController.prototype, "createStream", null);
__decorate([
    common_1.Post('transaction'),
    swagger_1.ApiOperation({ summary: 'Create Transaction' }),
    swagger_1.ApiResponse({ status: 200, description: 'Transaction created' }),
    swagger_1.ApiResponse({ status: 400, description: 'Transaction creation failed' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_body_1.TransactionBody]),
    __metadata("design:returntype", Promise)
], MultiChainController.prototype, "createTransaction", null);
__decorate([
    common_1.Post('approve'),
    swagger_1.ApiOperation({ summary: 'Approve Filter' }),
    swagger_1.ApiResponse({ status: 200, description: 'Filter approved' }),
    swagger_1.ApiResponse({ status: 400, description: 'Filter approval failed' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [approve_body_1.ApproveBody]),
    __metadata("design:returntype", Promise)
], MultiChainController.prototype, "approveFilter", null);
__decorate([
    common_1.Post('disapprove'),
    swagger_1.ApiOperation({ summary: 'Disapprove Filter' }),
    swagger_1.ApiResponse({ status: 200, description: 'Filter disapproved' }),
    swagger_1.ApiResponse({ status: 400, description: 'Filter disapproval failed' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [approve_body_1.ApproveBody]),
    __metadata("design:returntype", Promise)
], MultiChainController.prototype, "disapproveFilter", null);
MultiChainController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('Multichain'),
    common_1.Controller('Multichain'),
    common_1.UseFilters(new domain_exception_filter_1.DomainExceptionFilter()),
    __metadata("design:paramtypes", [multichain_service_1.MultiChainService])
], MultiChainController);
exports.MultiChainController = MultiChainController;
//# sourceMappingURL=multichain.controller.js.map