import { Exclude } from 'class-transformer';
import { LegalEntityEvent } from '../legal-entity.event';

@Exclude()
export class OrganizationDeleted extends LegalEntityEvent {

  static version = '1';

  constructor(organizationId: string) {
    super(organizationId, OrganizationDeleted.version);
  }
}
