"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStoreConfiguration = void 0;
const common_1 = require("@nestjs/common");
let EventStoreConfiguration = class EventStoreConfiguration {
    get config() {
        return {
            hostname: process.env.EVENT_STORE_HOST || 'localhost',
            port: parseInt(process.env.EVENT_STORE_PORT) || 1113,
            credentials: {
                username: process.env.EVENT_STORE_CREDENTIALS_USERNAME || 'admin',
                password: process.env.EVENT_STORE_CREDENTIALS_PASSWORD || 'changeit',
            },
        };
    }
};
EventStoreConfiguration = __decorate([
    common_1.Injectable()
], EventStoreConfiguration);
exports.EventStoreConfiguration = EventStoreConfiguration;
//# sourceMappingURL=event-store.configuration.js.map