"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatastreamUpdatedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const datastreamupdated_v1_event_1 = require("./datastreamupdated-v1.event");
var datastreamupdated_v1_event_2 = require("./datastreamupdated-v1.event");
Object.defineProperty(exports, "DatastreamUpdated", { enumerable: true, get: function () { return datastreamupdated_v1_event_2.DatastreamUpdated; } });
function getDatastreamUpdatedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === datastreamupdated_v1_event_1.DatastreamUpdated.version ? class_transformer_1.plainToClass(datastreamupdated_v1_event_1.DatastreamUpdated, eventMessage.data) : null;
}
exports.getDatastreamUpdatedEvent = getDatastreamUpdatedEvent;
//# sourceMappingURL=index.js.map