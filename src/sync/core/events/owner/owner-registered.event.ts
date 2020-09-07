import { OwnerEvent } from './owner.event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OwnerRegistered extends OwnerEvent {

  @Expose()
  public readonly contactEmail: string;

  @Expose()
  public readonly contactPhone: string;

  constructor(ownerId: string, contactEmail: string, contactPhone: string) {
    super(ownerId);
    this.contactEmail = contactEmail;
    this.contactPhone = contactPhone;
  }
}
