"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactDetailsUpdatedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const contact_details_updated_v1_event_1 = require("./contact-details-updated-v1.event");
var contact_details_updated_v1_event_2 = require("./contact-details-updated-v1.event");
Object.defineProperty(exports, "ContactDetailsUpdated", { enumerable: true, get: function () { return contact_details_updated_v1_event_2.ContactDetailsUpdated; } });
function getContactDetailsUpdatedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === contact_details_updated_v1_event_1.ContactDetailsUpdated.version ? class_transformer_1.plainToClass(contact_details_updated_v1_event_1.ContactDetailsUpdated, eventMessage.data) : null;
}
exports.getContactDetailsUpdatedEvent = getContactDetailsUpdatedEvent;
//# sourceMappingURL=index.js.map