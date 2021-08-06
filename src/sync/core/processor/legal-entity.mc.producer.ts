import { Injectable } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { legalEntityStreamRootValue } from '../events/legal-entity';
import { AbstractMultiChainProducer } from './abstract.mc.producer';

@Injectable()
export class LegalEntityMultiChainProducer extends AbstractMultiChainProducer {
    constructor(multichainService: MultiChainService) {
        super(`${legalEntityStreamRootValue}`, multichainService);
    }
}
