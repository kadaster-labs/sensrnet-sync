import { DomainException } from './domain-exception';

export class SubscriptionExistsException extends DomainException {
    constructor() {
        super(`An open subscription exists already. Close the subscription first.`);
    }
}
