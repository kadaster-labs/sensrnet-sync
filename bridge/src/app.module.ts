import { Module } from '@nestjs/common';
import { SensorQueryModule } from './sync/sensor/sensor.module';
import { MongooseModule } from '@nestjs/mongoose';

const port = process.env.MONGO_PORT || 27017;
const host = process.env.MONGO_HOST || 'localhost';
const database = process.env.MONGO_DATABASE || 'sensrnet';

@Module({
  imports: [
      MongooseModule.forRoot(`mongodb://${host}:${port}/${database}`),
      SensorQueryModule,
  ]
})

export class AppModule {}
