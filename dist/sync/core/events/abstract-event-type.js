"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEventType = void 0;
const common_1 = require("@nestjs/common");
class AbstractEventType {
    constructor() {
        this.supportedTypes = {};
    }
    getEvent(eventTypeName) {
        const upcastFn = this.supportedTypes[eventTypeName.eventType];
        const event = upcastFn ? upcastFn(eventTypeName) : undefined;
        if (!event) {
            common_1.Logger.warn(`Unsupported event received! eventType: ${eventTypeName.eventType}`);
        }
        return event;
    }
    add(eventClass, upcastFn) {
        this.supportedTypes[eventClass.name] = upcastFn;
    }
}
exports.AbstractEventType = AbstractEventType;
//# sourceMappingURL=abstract-event-type.js.map