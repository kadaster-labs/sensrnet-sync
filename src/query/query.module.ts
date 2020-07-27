import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { MultiChainService } from './multichain.service';
import { MultichainConfiguration } from '../multichain.configuration';

@Module({
  imports: [
    QueryModule,
  ],
  controllers: [
    QueryController
  ],
  providers: [
    MultiChainService,
    MultichainConfiguration,
  ]
})

export class QueryModule {}
