import { Injectable } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { AbstractMultiChainProducer } from './abstract.mc.producer';

@Injectable()
export class OwnerMultiChainProducer extends AbstractMultiChainProducer {

  constructor(
    multichainService: MultiChainService,
  ) {
    super('owners', multichainService);
  }

}
