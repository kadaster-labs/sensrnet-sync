import { Injectable } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { AbstractMultiChainProducer } from './abstract.mc.producer';

@Injectable()
export class SensorMultiChainProducer extends AbstractMultiChainProducer {

  constructor(
    multichainService: MultiChainService,
  ) {
    super('sensors', multichainService);
  }

}
