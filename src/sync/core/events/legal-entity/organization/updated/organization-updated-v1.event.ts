import { Exclude, Expose } from 'class-transformer';
import { LegalEntityEvent } from '../../legal-entity.event';

@Exclude()
export class OrganizationUpdated extends LegalEntityEvent {
    static version = '1';

    @Expose()
    public readonly name: string;

    @Expose()
    public readonly website: string;

    constructor(organizationId: string, name: string, website: string) {
        super(organizationId, OrganizationUpdated.version);

        this.name = name;
        this.website = website;
    }
}
