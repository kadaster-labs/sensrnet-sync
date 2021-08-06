import { Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { SensorDeviceESListener } from '../processor/sensordevice.es.listener';
import { AbstractESController } from './abstract.es.controller';

@ApiBearerAuth()
@ApiTags('SensorDeviceES')
@Controller('SensorDeviceES')
@UseFilters(new DomainExceptionFilter())
export class SensorDeviceESController extends AbstractESController {
    constructor(eventStoreListener: SensorDeviceESListener) {
        super(eventStoreListener);
    }
}
