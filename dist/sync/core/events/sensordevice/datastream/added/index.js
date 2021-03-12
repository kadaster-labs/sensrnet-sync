"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatastreamAddedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const datastream_added_v1_event_1 = require("./datastream-added-v1.event");
var datastream_added_v1_event_2 = require("./datastream-added-v1.event");
Object.defineProperty(exports, "DatastreamAdded", { enumerable: true, get: function () { return datastream_added_v1_event_2.DatastreamAdded; } });
function getDatastreamAddedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === datastream_added_v1_event_1.DatastreamAdded.version ? class_transformer_1.plainToClass(datastream_added_v1_event_1.DatastreamAdded, eventMessage.data) : null;
}
exports.getDatastreamAddedEvent = getDatastreamAddedEvent;
//# sourceMappingURL=index.js.map