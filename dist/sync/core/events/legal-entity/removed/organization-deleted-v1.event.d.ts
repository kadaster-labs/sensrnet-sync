import { LegalEntityEvent } from '../legal-entity.event';
export declare class OrganizationDeleted extends LegalEntityEvent {
    static version: string;
    constructor(organizationId: string);
}
