"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retry = void 0;
const common_1 = require("@nestjs/common");
class Retry {
    constructor(maxRetryCount) {
        this.maxRetryCount = maxRetryCount;
        this.retryCount = 0;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    incrementRetryCount() {
        this.retryCount += 1;
        if (this.retryCount < this.maxRetryCount) {
            this.logger.error(`Failed to connect ${this.retryCount} times. Retrying.`);
        }
        else {
            this.logger.error(`Failed to connect ${this.retryCount} times. Exiting.`);
            process.exit(0);
        }
    }
    resetRetryCount() {
        this.retryCount = 0;
    }
}
exports.Retry = Retry;
//# sourceMappingURL=retry.js.map