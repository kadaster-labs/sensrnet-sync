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
exports.EventStore = void 0;
const common_1 = require("@nestjs/common");
const geteventstore_promise_1 = require("geteventstore-promise");
const event_store_configuration_1 = require("./event-store.configuration");
let EventStore = class EventStore {
    constructor(configuration) {
        this.configuration = configuration;
    }
    connect() {
        this.client = new geteventstore_promise_1.TCPClient(this.configuration.config);
    }
    async createEvent(event) {
        await this.client.writeEvent(event.streamId, event.eventType, event.data, event.metadata);
    }
    async subscribeToStreamFrom(streamName, fromEventNumber, onEventAppeared, onLiveProcessingStarted, onDropped) {
        const settings = {
            readBatchSize: 1,
            resolveLinkTos: true,
        };
        return await this.client.subscribeToStreamFrom(streamName, fromEventNumber, onEventAppeared, onLiveProcessingStarted, onDropped, settings);
    }
    async onModuleInit() {
        this.connect();
    }
};
EventStore = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [event_store_configuration_1.EventStoreConfiguration])
], EventStore);
exports.EventStore = EventStore;
//# sourceMappingURL=event-store.js.map