import { SensorMultiChainConsumer } from '../processor/sensor.mc.consumer';
import { Controller, UseFilters } from '@nestjs/common';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AbstractMultiChainController } from './abstract.ms.controller';

@ApiBearerAuth()
@ApiTags('SensorMC')
@Controller('SensorMC')
@UseFilters(new DomainExceptionFilter())
export class SensorMultiChainController extends AbstractMultiChainController {

  constructor(
    multichainConsumer: SensorMultiChainConsumer,
  ) {
    super(multichainConsumer);
  }

}
