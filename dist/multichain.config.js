"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiChainConfig = void 0;
const common_1 = require("@nestjs/common");
let MultiChainConfig = class MultiChainConfig {
    get config() {
        const port = parseInt(process.env.MULTICHAIN_PORT) || 8570;
        const hostname = process.env.MULTICHAIN_HOST || '127.0.0.1';
        const password = process.env.MULTICHAIN_PASSWORD || 'password';
        const username = process.env.MULTICHAIN_USER || 'multichainrpc';
        return { hostname, port, username, password };
    }
};
MultiChainConfig = __decorate([
    common_1.Injectable()
], MultiChainConfig);
exports.MultiChainConfig = MultiChainConfig;
//# sourceMappingURL=multichain.config.js.map