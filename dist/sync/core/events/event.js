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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const event_message_1 = require("./event-message");
const class_transformer_1 = require("class-transformer");
let Event = class Event {
    constructor(aggregateId, version) {
        this.aggregateId = aggregateId;
        this.version = version;
    }
    toEventMessage() {
        const _a = this, { version } = _a, eventData = __rest(_a, ["version"]);
        return new event_message_1.EventMessage(`${this.streamRoot()}-${this.aggregateId}`, this.constructor.name, eventData, { version, originSync: true });
    }
};
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], Event.prototype, "aggregateId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], Event.prototype, "eventType", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", event_message_1.EventMessage)
], Event.prototype, "toEventMessage", null);
Event = __decorate([
    class_transformer_1.Exclude(),
    __metadata("design:paramtypes", [String, String])
], Event);
exports.Event = Event;
//# sourceMappingURL=event.js.map