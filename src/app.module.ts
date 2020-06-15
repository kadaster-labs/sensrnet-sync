import { Module } from '@nestjs/common';
import { SensorQueryModule } from './sync/sensor/sensor.module';

@Module({
  imports: [SensorQueryModule,]
})

export class AppModule {}
