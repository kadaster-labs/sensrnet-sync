import { LegalEntityEvent } from '../../legal-entity.event';
export declare class OrganizationRegistered extends LegalEntityEvent {
    static version: string;
    readonly name: string;
    readonly website: string;
    constructor(organizationId: string, name: string, website: string);
}
