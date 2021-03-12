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
exports.MultiChainService = void 0;
const multichain = require("multinodejs");
const common_1 = require("@nestjs/common");
const multichain_config_1 = require("../../multichain.config");
let MultiChainService = class MultiChainService {
    constructor(multichainConfig) {
        this.multichainConfig = multichainConfig;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    initConnection() {
        const config = this.multichainConfig.config;
        this.setConnection(multichain({
            port: config.port,
            host: config.hostname,
            user: config.username,
            pass: config.password,
        }));
    }
    getConnection() {
        if (!this.connection) {
            this.initConnection();
        }
        return this.connection;
    }
    setConnection(connection) {
        this.connection = connection;
    }
    async getAddresses() {
        return this.getConnection().getAddresses();
    }
    async grant(address, permissions) {
        return this.getConnection().grant([address, permissions]);
    }
    async createStream(streamName) {
        return this.getConnection().create(['stream', streamName, true]);
    }
    async createTransaction(streamName, key, data) {
        return this.getConnection().publish([streamName, key, Buffer.from(data).toString('hex')]);
    }
    async createVariable(variableName, data) {
        return this.getConnection().create(['variable', variableName, true, JSON.stringify(data)]);
    }
    async listStreamItems(stream, start, count, verbose) {
        return this.getConnection().listStreamItems([stream, verbose, count, start]);
    }
    async subscribe(stream) {
        return this.getConnection().subscribe([stream]);
    }
    async approveFrom(address, filterName, approve) {
        return this.getConnection().approveFrom([address, filterName, approve]);
    }
};
MultiChainService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [multichain_config_1.MultiChainConfig])
], MultiChainService);
exports.MultiChainService = MultiChainService;
//# sourceMappingURL=multichain.service.js.map