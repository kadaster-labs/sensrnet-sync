import { Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { SensorDeviceMultiChainConsumer } from '../processor/sensordevice.mc.consumer';
import { AbstractMultiChainController } from './abstract.ms.controller';

@ApiBearerAuth()
@ApiTags('SensorDeviceMC')
@Controller('SensorDeviceMC')
@UseFilters(new DomainExceptionFilter())
export class SensorDeviceMultiChainController extends AbstractMultiChainController {
    constructor(multichainConsumer: SensorDeviceMultiChainConsumer) {
        super(multichainConsumer);
    }
}
