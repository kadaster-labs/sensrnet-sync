import { Event } from '../event';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class OwnerEvent extends Event {

  @Expose()
  readonly ownerId: string;

  protected constructor(ownerId: string) {
    super(ownerId);
    this.ownerId = ownerId;
  }

  @Expose()
  streamRoot(): string {
    return 'owner';
  }
}
