import { GrantBody } from './models/body/grant-body';
import { StreamBody } from './models/body/stream-body';
import { MultiChainService } from './multichain.service';
import { TransactionBody } from './models/body/transaction-body';
import { DomainExceptionFilter } from './errors/domain-exception.filter';
import { UseFilters, Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('MultiChain')
@Controller('MultiChain')
@UseFilters(new DomainExceptionFilter())
export class QueryController {

  constructor(
      private readonly multiChainService: MultiChainService
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
  async grant(@Body() params: GrantBody) {
    return this.multiChainService.grant(params.address, params.permissions);
  }

  @Post('stream')
  @ApiOperation({ summary: 'Create Stream' })
  @ApiResponse({ status: 200, description: 'Stream created' })
  @ApiResponse({ status: 400, description: 'Stream creation failed' })
  async createStream(@Body() params: StreamBody) {
    return this.multiChainService.createStream(params.name);
  }

  @Post('transaction')
  @ApiOperation({ summary: 'Create Transaction' })
  @ApiResponse({ status: 200, description: 'Transaction created' })
  @ApiResponse({ status: 400, description: 'Transaction creation failed' })
  async createTransaction(@Body() params: TransactionBody) {
    return this.multiChainService.createTransaction(params.name, params.data);
  }
}
