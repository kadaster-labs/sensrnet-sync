import { GrantBody } from './models/body/grant-body';
import { MultiChainService } from './multichain.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
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

  @Post('grant')
  @ApiOperation({ summary: 'Grant Permissions' })
  @ApiResponse({ status: 200, description: 'Permissions granted' })
  @ApiResponse({ status: 400, description: 'Permissions grant failed' })
  async grant(@Body() params: GrantBody) {
    return this.multiChainService.grant(params.address, params.permissions);
  }
}
