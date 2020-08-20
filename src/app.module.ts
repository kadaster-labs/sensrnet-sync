import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorQueryModule } from './sync/sensor/sensor.module';
import { CheckpointModule } from './sync/checkpoint/checkpoint.module';
import { MultiChainModule } from './sync/multichain/multichain.module';

const port = process.env.MONGO_PORT || 27017;
const host = process.env.MONGO_HOST || 'localhost';
const database = process.env.MONGO_DATABASE || 'sensrnet';

@Module({
  imports: [
      MultiChainModule,
      CheckpointModule,
      SensorQueryModule,
      MongooseModule.forRoot(`mongodb://${host}:${port}/${database}`),
  ]
})

export class AppModule {}
