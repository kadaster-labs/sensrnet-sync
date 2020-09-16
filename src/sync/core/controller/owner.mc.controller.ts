import { Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AbstractMultiChainController } from './abstract.ms.controller';
import { OwnerMultiChainConsumer } from '../processor/owner.mc.consumer';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';

@ApiBearerAuth()
@ApiTags('OwnerMC')
@Controller('OwnerMC')
@UseFilters(new DomainExceptionFilter())
export class OwnerMultiChainController extends AbstractMultiChainController {

  constructor(
    multichainConsumer: OwnerMultiChainConsumer,
  ) {
    super(multichainConsumer);
  }

}
