import { Logger } from '@nestjs/common';

export class Retry {
  private retryCount = 0;

  protected logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly maxRetryCount: number,
  ) {}

  incrementRetryCount(): void {
    this.retryCount += 1;

    if (this.retryCount < this.maxRetryCount) {
      this.logger.error(`Failed to connect ${this.retryCount} times. Retrying.`);
    } else {
      this.logger.error(`Failed to connect ${this.retryCount} times. Exiting.`);
      process.exit(0);
    }
  }

  resetRetryCount(): void {
    this.retryCount = 0;
  }
}
