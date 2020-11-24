import { Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AbstractESController } from './abstract.es.controller';
import { OrganizationEsListener } from '../processor/organization.es.listener';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';

@ApiBearerAuth()
@ApiTags('OrganizationES')
@Controller('OrganizationES')
@UseFilters(new DomainExceptionFilter())
export class OrganizationEsController extends AbstractESController {
  constructor(
    eventStoreListener: OrganizationEsListener,
  ) {
    super(eventStoreListener);
  }
}
