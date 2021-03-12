"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactDetailsRemovedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const contact_details_removed_v1_event_1 = require("./contact-details-removed-v1.event");
var contact_details_removed_v1_event_2 = require("./contact-details-removed-v1.event");
Object.defineProperty(exports, "ContactDetailsRemoved", { enumerable: true, get: function () { return contact_details_removed_v1_event_2.ContactDetailsRemoved; } });
function getContactDetailsRemovedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === contact_details_removed_v1_event_1.ContactDetailsRemoved.version ? class_transformer_1.plainToClass(contact_details_removed_v1_event_1.ContactDetailsRemoved, eventMessage.data) : null;
}
exports.getContactDetailsRemovedEvent = getContactDetailsRemovedEvent;
//# sourceMappingURL=index.js.map