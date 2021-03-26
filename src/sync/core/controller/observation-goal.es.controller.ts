import { Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { ObservationGoalEsListener } from '../processor/observation-goal.es.listener';
import { AbstractESController } from './abstract.es.controller';

@ApiBearerAuth()
@ApiTags('ObservationGoalES')
@Controller('ObservationGoalES')
@UseFilters(new DomainExceptionFilter())
export class ObservationGoalEsController extends AbstractESController {

  constructor(
    eventStoreListener: ObservationGoalEsListener,
  ) {
    super(eventStoreListener);
  }

}
