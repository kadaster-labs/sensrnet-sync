import { Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { ObservationGoalMultiChainConsumer } from '../processor/observation-goal.mc.consumer';
import { AbstractMultiChainController } from './abstract.ms.controller';

@ApiBearerAuth()
@ApiTags('ObservationGoalMC')
@Controller('ObservationGoalMC')
@UseFilters(new DomainExceptionFilter())
export class ObservationGoalMultiChainController extends AbstractMultiChainController {
    constructor(multichainConsumer: ObservationGoalMultiChainConsumer) {
        super(multichainConsumer);
    }
}
