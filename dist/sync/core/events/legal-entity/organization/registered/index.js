"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrganizationRegisteredEvent = void 0;
const class_transformer_1 = require("class-transformer");
const organization_registered_v1_event_1 = require("./organization-registered-v1.event");
var organization_registered_v1_event_2 = require("./organization-registered-v1.event");
Object.defineProperty(exports, "OrganizationRegistered", { enumerable: true, get: function () { return organization_registered_v1_event_2.OrganizationRegistered; } });
function getOrganizationRegisteredEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === organization_registered_v1_event_1.OrganizationRegistered.version ? class_transformer_1.plainToClass(organization_registered_v1_event_1.OrganizationRegistered, eventMessage.data) : null;
}
exports.getOrganizationRegisteredEvent = getOrganizationRegisteredEvent;
//# sourceMappingURL=index.js.map