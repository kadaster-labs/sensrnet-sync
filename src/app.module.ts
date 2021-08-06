import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { CheckpointModule } from './sync/checkpoint/checkpoint.module';
import { CoreModule } from './sync/core/core.module';
import { MultiChainModule } from './sync/multichain/multichain.module';

const port = process.env.MONGO_PORT || 27017;
const host = process.env.MONGO_HOST || 'localhost';
const database = process.env.MONGO_DATABASE || 'sensrnet';

@Module({
    imports: [
        MultiChainModule,
        CheckpointModule,
        CoreModule,
        MongooseModule.forRoot(`mongodb://${host}:${port}/${database}`),
        TerminusModule,
    ],
    controllers: [HealthController],
})
export class AppModule {}
