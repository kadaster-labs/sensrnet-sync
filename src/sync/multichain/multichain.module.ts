import { Module } from '@nestjs/common';
import { MultiChainService } from './multichain.service';
import { MultiChainConfig } from '../../multichain.config';
import { MultiChainController } from './multichain.controller';

@Module({
  imports: [
    MultiChainModule,
  ],
  controllers: [
    MultiChainController,
  ],
  providers: [
    MultiChainService,
    MultiChainConfig,
  ],
  exports: [
    MultiChainService,
  ],
})

export class MultiChainModule {
}
