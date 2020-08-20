import { Module } from '@nestjs/common';
import { MultiChainService } from './multichain.service';
import { MultichainController } from './multichain.controller';
import { MultichainConfiguration } from '../../multichain.configuration';

@Module({
    imports: [
        MultiChainModule,
    ],
    controllers: [
        MultichainController,
    ],
    providers: [
        MultiChainService,
        MultichainConfiguration,
    ],
    exports: [
        MultiChainService,
    ]
})

export class MultiChainModule {}
