import { Exclude, Expose } from 'class-transformer';
import { LegalEntityEvent } from '../../legal-entity.event';

@Exclude()
export class ContactDetailsRemoved extends LegalEntityEvent {
    static version = '1';

    @Expose()
    readonly legalEntityId: string;
    @Expose()
    readonly contactDetailsId: string;

    constructor(legalEntityId: string, contactDetailsId: string) {
        super(legalEntityId, ContactDetailsRemoved.version);

        this.legalEntityId = legalEntityId;
        this.contactDetailsId = contactDetailsId;
    }
}
