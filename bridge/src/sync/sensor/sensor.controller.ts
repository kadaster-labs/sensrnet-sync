import { QueryBus } from '@nestjs/cqrs';
import { SensorIdParams } from './models/id-params';
import { Controller, Get, Param } from '@nestjs/common';
import { RetrieveSensorsQuery } from './queries/sensors.query';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Sensor')
@Controller('Sensor')
export class SensorController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':sensorId')
  @ApiOperation({ summary: 'Retrieve Sensor' })
  @ApiResponse({ status: 200, description: 'Sensor retrieved' })
  @ApiResponse({ status: 400, description: 'Sensor retrieval failed' })
  async retrieveSensors(@Param() sensorIdParams: SensorIdParams) {
    return await this.queryBus.execute(new RetrieveSensorsQuery(sensorIdParams.sensorId));
  }
}
