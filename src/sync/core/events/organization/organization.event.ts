import { Event } from '../event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class OrganizationEvent extends Event {
  protected constructor(organizationId: string, version: string) {
    super(organizationId, version);
  }

  @Expose()
  streamRoot(): string {
    return 'organization';
  }
}
