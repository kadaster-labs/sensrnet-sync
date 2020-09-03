import { OwnerMultiChainConsumer } from '../processor/owner.mc.consumer';
import { Controller, UseFilters } from '@nestjs/common';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AbstractMultiChainController } from './abstract.ms.controller';

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
