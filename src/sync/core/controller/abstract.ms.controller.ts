import { Body, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OffsetBody } from './model/offset-body';
import { AbstractMsConsumer } from '../processor/abstract.mc.consumer';

export class AbstractMultiChainController {

  constructor(
    private readonly multichainConsumer: AbstractMsConsumer,
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
