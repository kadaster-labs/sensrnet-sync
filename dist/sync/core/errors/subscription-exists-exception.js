"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionExistsException = void 0;
const domain_exception_1 = require("./domain-exception");
class SubscriptionExistsException extends domain_exception_1.DomainException {
    constructor() {
        super(`An open subscription exists. Close the subscription first.`);
    }
}
exports.SubscriptionExistsException = SubscriptionExistsException;
//# sourceMappingURL=subscription-exists-exception.js.map