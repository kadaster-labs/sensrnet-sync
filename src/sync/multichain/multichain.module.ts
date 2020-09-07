import { Module } from '@nestjs/common';
import { MultiChainService } from './multichain.service';
import { MultichainController } from './multichain.controller';
import { MultichainConfig } from '../../multichain.config';

@Module({
  imports: [
    MultiChainModule,
  ],
  controllers: [
    MultichainController,
  ],
  providers: [
    MultiChainService,
    MultichainConfig,
  ],
  exports: [
    MultiChainService,
  ],
})

export class MultiChainModule {
}
