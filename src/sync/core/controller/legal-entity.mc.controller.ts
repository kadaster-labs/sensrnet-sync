import { Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { LegalEntityMultiChainConsumer } from '../processor/legal-entity.mc.consumer';
import { AbstractMultiChainController } from './abstract.ms.controller';

@ApiBearerAuth()
@ApiTags('LegalEntityMC')
@Controller('LegalEntityMC')
@UseFilters(new DomainExceptionFilter())
export class LegalEntityMultiChainController extends AbstractMultiChainController {
    constructor(multichainConsumer: LegalEntityMultiChainConsumer) {
        super(multichainConsumer);
    }
}
