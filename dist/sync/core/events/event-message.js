"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventMessage = void 0;
class EventMessage {
    constructor(streamId, eventType, data = {}, metadata = {}) {
        this.streamId = streamId;
        this.eventType = eventType;
        this.data = data;
        this.metadata = metadata;
    }
}
exports.EventMessage = EventMessage;
//# sourceMappingURL=event-message.js.map