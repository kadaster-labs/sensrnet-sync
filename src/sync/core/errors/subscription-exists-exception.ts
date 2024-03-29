import { DomainException } from './domain-exception';

export class SubscriptionExistsException extends DomainException {
    constructor() {
        super(`An open subscription exists. Close the subscription first.`);
    }
}
