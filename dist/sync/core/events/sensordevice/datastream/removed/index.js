"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatastreamRemovedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const datastream_removed_v1_event_1 = require("./datastream-removed-v1.event");
var datastream_removed_v1_event_2 = require("./datastream-removed-v1.event");
Object.defineProperty(exports, "DatastreamRemoved", { enumerable: true, get: function () { return datastream_removed_v1_event_2.DatastreamRemoved; } });
function getDatastreamRemovedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === datastream_removed_v1_event_1.DatastreamRemoved.version ? class_transformer_1.plainToClass(datastream_removed_v1_event_1.DatastreamRemoved, eventMessage.data) : null;
}
exports.getDatastreamRemovedEvent = getDatastreamRemovedEvent;
//# sourceMappingURL=index.js.map