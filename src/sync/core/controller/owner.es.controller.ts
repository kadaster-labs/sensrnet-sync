import { Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AbstractESController } from './abstract.es.controller';
import { OwnerESListener } from '../processor/owner.es.listener';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';

@ApiBearerAuth()
@ApiTags('OwnerES')
@Controller('OwnerES')
@UseFilters(new DomainExceptionFilter())
export class OwnerESController extends AbstractESController {

  constructor(
    eventStoreListener: OwnerESListener,
  ) {
    super(eventStoreListener);
  }

}
