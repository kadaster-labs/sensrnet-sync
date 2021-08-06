import { Module } from '@nestjs/common';
import { MultiChainConfig } from '../../multichain.config';
import { MultiChainController } from './multichain.controller';
import { MultiChainService } from './multichain.service';

@Module({
    imports: [MultiChainModule],
    controllers: [MultiChainController],
    providers: [MultiChainService, MultiChainConfig],
    exports: [MultiChainService],
})
export class MultiChainModule {}
