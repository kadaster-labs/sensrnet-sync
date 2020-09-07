import { Response } from 'express';
import { DomainException } from './domain-exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {

  catch(exception: DomainException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400).json({
      error: exception.message,
    });
  }

}
