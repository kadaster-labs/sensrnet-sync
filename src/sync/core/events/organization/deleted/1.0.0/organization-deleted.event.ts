import { Exclude } from 'class-transformer';
import { OrganizationEvent } from '../../organization.event';

@Exclude()
export class OrganizationDeleted extends OrganizationEvent {

  static version = '1.0.0';

  constructor(organizationId: string) {
    super(organizationId, OrganizationDeleted.version);
  }
}
