"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrganizationUpdatedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const organization_updated_v1_event_1 = require("./organization-updated-v1.event");
var organization_updated_v1_event_2 = require("./organization-updated-v1.event");
Object.defineProperty(exports, "OrganizationUpdated", { enumerable: true, get: function () { return organization_updated_v1_event_2.OrganizationUpdated; } });
function getOrganizationUpdatedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === organization_updated_v1_event_1.OrganizationUpdated.version ? class_transformer_1.plainToClass(organization_updated_v1_event_1.OrganizationUpdated, eventMessage.data) : null;
}
exports.getOrganizationUpdatedEvent = getOrganizationUpdatedEvent;
//# sourceMappingURL=index.js.map