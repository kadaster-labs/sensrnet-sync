"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainExceptionFilter = void 0;
const domain_exception_1 = require("./domain-exception");
const common_1 = require("@nestjs/common");
let DomainExceptionFilter = class DomainExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(400).json({
            error: exception.message,
        });
    }
};
DomainExceptionFilter = __decorate([
    common_1.Catch(domain_exception_1.DomainException)
], DomainExceptionFilter);
exports.DomainExceptionFilter = DomainExceptionFilter;
//# sourceMappingURL=domain-exception.filter.js.map