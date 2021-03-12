import { LegalEntityEvent } from '../../legal-entity.event';
export declare class PublicContactDetailsAdded extends LegalEntityEvent {
    static version: string;
    readonly legalEntityId: string;
    readonly contactDetailsId: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    constructor(legalEntityId: string, contactDetailsId: string, name: string, email: string, phone: string);
}
