import { MultiChainService } from './multichain.service';
import { Controller, Get, Post, Param } from '@nestjs/common';
import { AddressParams } from './models/params/address-params';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('MultiChain')
@Controller('MultiChain')
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

  @Post('grant/send/:address')
  @ApiOperation({ summary: 'Grant Send Rights' })
  @ApiResponse({ status: 200, description: 'Send rights granted' })
  @ApiResponse({ status: 400, description: 'Send rights grant failed' })
  async grantSend(@Param() params: AddressParams) {
    return this.multiChainService.grantSend(params.address);
  }
}
