import { Event } from '../event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class OrganizationEvent extends Event {

  protected constructor(organizationId: string) {
    super(organizationId);
  }

  @Expose()
  streamRoot(): string {
    return 'organization';
  }
}
