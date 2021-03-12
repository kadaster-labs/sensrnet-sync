import { LegalEntityEsListener } from '../processor/legal-entity.es.listener';
import { AbstractESController } from './abstract.es.controller';
export declare class LegalEntityEsController extends AbstractESController {
    constructor(eventStoreListener: LegalEntityEsListener);
}
