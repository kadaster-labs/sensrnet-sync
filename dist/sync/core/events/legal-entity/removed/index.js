"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrganizationDeletedEvent = void 0;
const class_transformer_1 = require("class-transformer");
const organization_deleted_v1_event_1 = require("./organization-deleted-v1.event");
var organization_deleted_v1_event_2 = require("./organization-deleted-v1.event");
Object.defineProperty(exports, "OrganizationDeleted", { enumerable: true, get: function () { return organization_deleted_v1_event_2.OrganizationDeleted; } });
function getOrganizationDeletedEvent(eventMessage) {
    return !eventMessage.metadata.version || eventMessage.metadata.version === organization_deleted_v1_event_1.OrganizationDeleted.version ? class_transformer_1.plainToClass(organization_deleted_v1_event_1.OrganizationDeleted, eventMessage.data) : null;
}
exports.getOrganizationDeletedEvent = getOrganizationDeletedEvent;
//# sourceMappingURL=index.js.map