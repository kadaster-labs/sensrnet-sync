import { DomainException } from './domain-exception';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: DomainException, host: ArgumentsHost): void;
}
