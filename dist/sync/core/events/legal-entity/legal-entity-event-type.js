"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.legalEntityEventType = void 0;
const abstract_event_type_1 = require("../abstract-event-type");
const registered_1 = require("./organization/registered");
const updated_1 = require("./organization/updated");
const removed_1 = require("./removed");
class LegalEntityEventType extends abstract_event_type_1.AbstractEventType {
    constructor() {
        super();
        this.add(registered_1.OrganizationRegistered, registered_1.getOrganizationRegisteredEvent);
        this.add(updated_1.OrganizationUpdated, updated_1.getOrganizationUpdatedEvent);
        this.add(removed_1.OrganizationDeleted, removed_1.getOrganizationDeletedEvent);
    }
}
exports.legalEntityEventType = new LegalEntityEventType();
//# sourceMappingURL=legal-entity-event-type.js.map