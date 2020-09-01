import { OwnerEvent } from './owner.event';
import { Exclude } from 'class-transformer';

@Exclude()
export class OwnerDeleted extends OwnerEvent {

  constructor(ownerId: string) {
    super(ownerId);
  }
}
