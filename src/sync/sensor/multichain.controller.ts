import { GrantBody } from './models/body/grant-body';
import { StreamBody } from './models/body/stream-body';
import { OffsetBody } from './models/body/offset-body';
import { TransactionBody } from './models/body/transaction-body';
import { MultiChainService } from './multichain/multichain.service';
import { MultichainConsumer } from './multichain/multichain-consumer';
import { DomainExceptionFilter } from './errors/domain-exception.filter';
import { UseFilters, Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Multichain')
@Controller('Multichain')
@UseFilters(new DomainExceptionFilter())
export class MultichainController {

  constructor(
      private readonly multiChainService: MultiChainService,
      private readonly multichainConsumer: MultichainConsumer,
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
