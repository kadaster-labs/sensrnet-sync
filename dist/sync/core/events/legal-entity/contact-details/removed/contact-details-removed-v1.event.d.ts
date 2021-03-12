import { LegalEntityEvent } from '../../legal-entity.event';
export declare class ContactDetailsRemoved extends LegalEntityEvent {
    static version: string;
    readonly legalEntityId: string;
    readonly contactDetailsId: string;
    constructor(legalEntityId: string, contactDetailsId: string);
}
