"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSubscriptionException = void 0;
const domain_exception_1 = require("./domain-exception");
class NoSubscriptionException extends domain_exception_1.DomainException {
    constructor() {
        super(`No open subscription exists.`);
    }
}
exports.NoSubscriptionException = NoSubscriptionException;
//# sourceMappingURL=no-subscription-exception.js.map