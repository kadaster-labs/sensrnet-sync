import { Exclude, Expose } from 'class-transformer';
import { LegalEntityEvent } from '../../legal-entity.event';

@Exclude()
export class PublicContactDetailsAdded extends LegalEntityEvent {

  static version = '1';

  @Expose()
  readonly legalEntityId: string;

  @Expose()
  readonly contactDetailsId: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly phone: string;

  constructor(legalEntityId: string, contactDetailsId: string, name: string, email: string, phone: string) {
    super(legalEntityId, PublicContactDetailsAdded.version);

    this.legalEntityId = legalEntityId;
    this.contactDetailsId = contactDetailsId;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

}
