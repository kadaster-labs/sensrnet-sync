import { OffsetBody } from './model/offset-body';
import { SensorESListener } from '../processor/sensor.es.listener';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { DomainExceptionFilter } from '../errors/domain-exception.filter';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('SensorES')
@Controller('SensorES')
@UseFilters(new DomainExceptionFilter())
export class SensorESController {

  constructor(
    private readonly eventStoreListener: SensorESListener,
  ) {
  }

  @Post('subscription/open')
  @ApiOperation({ summary: 'Open subscription' })
  @ApiResponse({ status: 200, description: 'Subscription opened' })
  @ApiResponse({ status: 400, description: 'Failed to open subscription' })
  async openEventStoreSubscription(): Promise<void> {
    await this.eventStoreListener.openSubscription();
  }

  @Post('subscription/close')
  @ApiOperation({ summary: 'Close subscription' })
  @ApiResponse({ status: 200, description: 'Subscription closed' })
  @ApiResponse({ status: 400, description: 'Failed to close subscription' })
  async closeEventStoreSubscription(): Promise<void> {
    this.eventStoreListener.closeSubscription();
  }

  @Get('checkpoint')
  @ApiOperation({ summary: 'Retrieve checkpoint offset' })
  @ApiResponse({ status: 200, description: 'Checkpoint offset retrieved' })
  @ApiResponse({ status: 400, description: 'Failed to retrieve Checkpoint offset' })
  async retrieveEventStoreOffset(): Promise<number> {
    return this.eventStoreListener.getOffset();
  }

  @Post('checkpoint')
  @ApiOperation({ summary: 'Set checkpoint offset' })
  @ApiResponse({ status: 200, description: 'Checkpoint offset set' })
  @ApiResponse({ status: 400, description: 'Failed to set Checkpoint offset' })
  async setEventStoreOffset(@Body() body: OffsetBody): Promise<void> {
    await this.eventStoreListener.setOffset(body.offset);
  }

}
