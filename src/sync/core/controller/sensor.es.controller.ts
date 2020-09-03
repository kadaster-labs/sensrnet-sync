import { SensorESListener } from '../processor/sensor.es.listener';
import { Controller, UseFilters } from '@nestjs/common';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AbstractESController } from './abstract.es.controller';

@ApiBearerAuth()
@ApiTags('SensorES')
@Controller('SensorES')
@UseFilters(new DomainExceptionFilter())
export class SensorESController extends AbstractESController {

  constructor(
    eventStoreListener: SensorESListener,
  ) {
    super(eventStoreListener);
  }

}
