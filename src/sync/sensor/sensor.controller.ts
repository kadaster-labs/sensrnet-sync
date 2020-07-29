import { GrantBody } from './models/body/grant-body';
import { StreamBody } from './models/body/stream-body';
import { EventStoreListener } from './eventstore.listener';
import { EsOffsetBody } from './models/body/es-offset-body';
import { TransactionBody } from './models/body/transaction-body';
import { MultiChainService } from './multichain/multichain.service';
import { DomainExceptionFilter } from './errors/domain-exception.filter';
import { UseFilters, Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('MultiChain')
@Controller('MultiChain')
@UseFilters(new DomainExceptionFilter())
export class SensorController {

  constructor(
      private readonly multiChainService: MultiChainService,
      private readonly eventStoreListener: EventStoreListener,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve Addresses' })
  @ApiResponse({ status: 200, description: 'Addresses retrieved' })
  @ApiResponse({ status: 400, description: 'Addresses retrieval failed' })
  async retrieveAddresses() {
    return this.multiChainService.getAddress();
  }

  @Post('grant')
  @ApiOperation({ summary: 'Grant Permissions' })
  @ApiResponse({ status: 200, description: 'Permissions granted' })
  @ApiResponse({ status: 400, description: 'Permissions grant failed' })
  async grant(@Body() body: GrantBody) {
    return this.multiChainService.grant(body.address, body.permissions);
  }

  @Post('stream')
  @ApiOperation({ summary: 'Create Stream' })
  @ApiResponse({ status: 200, description: 'Stream created' })
  @ApiResponse({ status: 400, description: 'Stream creation failed' })
  async createStream(@Body() body: StreamBody) {
    return this.multiChainService.createStream(body.name);
  }

  @Post('transaction')
  @ApiOperation({ summary: 'Create Transaction' })
  @ApiResponse({ status: 200, description: 'Transaction created' })
  @ApiResponse({ status: 400, description: 'Transaction creation failed' })
  async createTransaction(@Body() body: TransactionBody) {
    return this.multiChainService.createTransaction(body.stream, body.data);
  }

  @Post('subscription/es/open')
  @ApiOperation({ summary: 'Open EventStore subscription' })
  @ApiResponse({ status: 200, description: 'EventStore subscription opened' })
  @ApiResponse({ status: 400, description: 'Failed to open EventStore subscription' })
  async openEventStoreSubscription() {
    this.eventStoreListener.openSubscription();
  }

  @Post('subscription/es/close')
  @ApiOperation({ summary: 'Close EventStore subscription' })
  @ApiResponse({ status: 200, description: 'EventStore subscription closed' })
  @ApiResponse({ status: 400, description: 'Failed to close EventStore subscription' })
  async closeEventStoreSubscription() {
    this.eventStoreListener.closeSubscription();
  }

  @Get('checkpoint/es')
  @ApiOperation({ summary: 'Retrieve EventStore checkpoint offset' })
  @ApiResponse({ status: 200, description: 'EventStore checkpoint offset retrieved' })
  @ApiResponse({ status: 400, description: 'Failed to retrieve EventStore checkpoint offset' })
  async retrieveEventStoreOffset() {
    return this.eventStoreListener.getOffset();
  }

  @Post('checkpoint/es')
  @ApiOperation({ summary: 'Set EventStore checkpoint offset' })
  @ApiResponse({ status: 200, description: 'EventStore checkpoint offset set' })
  @ApiResponse({ status: 400, description: 'Failed to set EventStore checkpoint offset' })
  async setEventStoreOffset(@Body() body: EsOffsetBody) {
    await this.eventStoreListener.setOffset(body.offset);
  }
}
