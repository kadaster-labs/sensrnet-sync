import { Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AbstractMultiChainController } from './abstract.ms.controller';
import { OrganizationMultiChainConsumer } from '../processor/organization.mc.consumer';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';

@ApiBearerAuth()
@ApiTags('OrganizationMC')
@Controller('OrganizationMC')
@UseFilters(new DomainExceptionFilter())
export class OrganizationMultiChainController extends AbstractMultiChainController {
  constructor(
    multichainConsumer: OrganizationMultiChainConsumer,
  ) {
    super(multichainConsumer);
  }
}
