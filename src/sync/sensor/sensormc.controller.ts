import { OffsetBody } from './models/body/offset-body';
import { SensorMultiChainConsumer } from './sensormc.consumer';
import { UseFilters, Controller, Get, Post, Body } from '@nestjs/common';
import { DomainExceptionFilter } from '../core/errors/domain-exception.filter';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('SensorMC')
@Controller('SensorMC')
@UseFilters(new DomainExceptionFilter())
export class SensorMultiChainController {

  constructor(
      private readonly multichainConsumer: SensorMultiChainConsumer,
  ) {}

  @Get('checkpoint')
  @ApiOperation({ summary: 'Retrieve checkpoint offset' })
  @ApiResponse({ status: 200, description: 'Checkpoint offset retrieved' })
  @ApiResponse({ status: 400, description: 'Failed to retrieve Checkpoint offset' })
  async retrieveMultichainOffset() {
    return this.multichainConsumer.getOffset();
  }

  @Post('checkpoint')
  @ApiOperation({ summary: 'Set checkpoint offset' })
  @ApiResponse({ status: 200, description: 'Checkpoint offset set' })
  @ApiResponse({ status: 400, description: 'Failed to set Checkpoint offset' })
  async setMultichainOffset(@Body() body: OffsetBody) {
    await this.multichainConsumer.setOffset(body.offset);
  }
}