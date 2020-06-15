import { QueryBus } from '@nestjs/cqrs';
import { Controller, Get } from '@nestjs/common';
import { RetrieveSensorsQuery } from './queries/sensors.query';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Sensor')
@Controller('Sensor')
export class SensorController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve Sensors' })
  @ApiResponse({ status: 200, description: 'Sensors retrieved' })
  @ApiResponse({ status: 400, description: 'Sensors retrieval failed' })
  async retrieveSensors() {
    return await this.queryBus.execute(new RetrieveSensorsQuery());
  }
}
