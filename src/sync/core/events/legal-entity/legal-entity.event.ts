import { Exclude, Expose } from 'class-transformer';
import { Event } from '../event';
import { legalEntityStreamRootValue } from './legal-entity.stream';

@Exclude()
export abstract class LegalEntityEvent extends Event {

  protected constructor(legalEntityId: string, version: string) {
    super(legalEntityId, version);
  }

  @Expose()
  streamRoot(): string {
    return legalEntityStreamRootValue;
  }

}
