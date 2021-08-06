import { Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { LegalEntityEsListener } from '../processor/legal-entity.es.listener';
import { AbstractESController } from './abstract.es.controller';

@ApiBearerAuth()
@ApiTags('LegalEntityES')
@Controller('LegalEntityES')
@UseFilters(new DomainExceptionFilter())
export class LegalEntityEsController extends AbstractESController {
    constructor(eventStoreListener: LegalEntityEsListener) {
        super(eventStoreListener);
    }
}
