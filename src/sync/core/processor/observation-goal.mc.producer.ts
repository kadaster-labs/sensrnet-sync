import { Injectable } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { observationGoalStreamRootValue } from '../events/observation-goal';
import { AbstractMultiChainProducer } from './abstract.mc.producer';

@Injectable()
export class ObservationGoalMultiChainProducer extends AbstractMultiChainProducer {
    constructor(multichainService: MultiChainService) {
        super(`${observationGoalStreamRootValue}`, multichainService);
    }
}
