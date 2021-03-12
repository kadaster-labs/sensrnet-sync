import { Injectable } from '@nestjs/common';
import { MultiChainService } from '../../multichain/multichain.service';
import { sensorDeviceStreamRootValue } from '../events/sensordevice';
import { AbstractMultiChainProducer } from './abstract.mc.producer';

@Injectable()
export class SensorDeviceMultiChainProducer extends AbstractMultiChainProducer {

  constructor(
    multichainService: MultiChainService,
  ) {
    super(`${sensorDeviceStreamRootValue}`, multichainService);
  }

}
