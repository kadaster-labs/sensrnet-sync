"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicContactDetailsAddedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const public_contact_details_added_v1_event_1 = require("./public-contact-details-added-v1.event");
var public_contact_details_added_v1_event_2 = require("./public-contact-details-added-v1.event");
Object.defineProperty(exports, "PublicContactDetailsAdded", { enumerable: true, get: function () { return public_contact_details_added_v1_event_2.PublicContactDetailsAdded; } });
function getPublicContactDetailsAddedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === public_contact_details_added_v1_event_1.PublicContactDetailsAdded.version ? class_transformer_1.plainToClass(public_contact_details_added_v1_event_1.PublicContactDetailsAdded, eventMessage.data) : null;
}
exports.getPublicContactDetailsAddedEvent = getPublicContactDetailsAddedEvent;
//# sourceMappingURL=index.js.map