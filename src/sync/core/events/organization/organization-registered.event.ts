import { OrganizationEvent } from './organization.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrganizationRegistered extends OrganizationEvent {
  @Expose()
  public readonly website: string;

  @Expose()
  public readonly contactName: string;

  @Expose()
  public readonly contactEmail: string;

  @Expose()
  public readonly contactPhone: string;

  constructor(organizationId: string, website: string, contactName: string,
              contactEmail: string, contactPhone: string) {
    super(organizationId);
    this.website = website;
    this.contactName = contactName;
    this.contactEmail = contactEmail;
    this.contactPhone = contactPhone;
  }
}
