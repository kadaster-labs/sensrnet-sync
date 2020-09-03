import { OffsetBody } from './model/offset-body';
import { SensorMultiChainConsumer } from '../processor/sensor.mc.consumer';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('SensorMC')
@Controller('SensorMC')
@UseFilters(new DomainExceptionFilter())
export class SensorMultiChainController {

  constructor(
    private readonly multichainConsumer: SensorMultiChainConsumer,
  ) {
  }

  @Get('checkpoint')
  @ApiOperation({ summary: 'Retrieve checkpoint offset' })
  @ApiResponse({ status: 200, description: 'Checkpoint offset retrieved' })
  @ApiResponse({ status: 400, description: 'Failed to retrieve Checkpoint offset' })
  async retrieveMultichainOffset(): Promise<number> {
    return this.multichainConsumer.getOffset();
  }

  @Post('checkpoint')
  @ApiOperation({ summary: 'Set checkpoint offset' })
  @ApiResponse({ status: 200, description: 'Checkpoint offset set' })
  @ApiResponse({ status: 400, description: 'Failed to set Checkpoint offset' })
  async setMultichainOffset(@Body() body: OffsetBody): Promise<void> {
    await this.multichainConsumer.setOffset(body.offset);
  }

}
