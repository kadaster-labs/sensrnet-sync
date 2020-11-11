import { OrganizationEvent } from './organization.event';
import { Exclude } from 'class-transformer';

@Exclude()
export class OrganizationDeleted extends OrganizationEvent {
  constructor(organizationId: string) {
    super(organizationId);
  }
}
