import { OffsetBody } from './model/offset-body';
import { OwnerMultiChainConsumer } from '../processor/owner.mc.consumer';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('OwnerMC')
@Controller('OwnerMC')
@UseFilters(new DomainExceptionFilter())
export class OwnerMultiChainController {

  constructor(
    private readonly multichainConsumer: OwnerMultiChainConsumer,
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
  async setMultichainOffset(@Body() body: OffsetBody) {
    await this.multichainConsumer.setOffset(body.offset);
  }
}
