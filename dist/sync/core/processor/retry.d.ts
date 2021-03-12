import { Logger } from '@nestjs/common';
export declare class Retry {
    private readonly maxRetryCount;
    private retryCount;
    protected logger: Logger;
    constructor(maxRetryCount: number);
    incrementRetryCount(): void;
    resetRetryCount(): void;
}
