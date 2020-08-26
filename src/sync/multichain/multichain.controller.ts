import { v4 } from 'uuid';
import { GrantBody } from './models/body/grant-body';
import { StreamBody } from './models/body/stream-body';
import { MultiChainService } from './multichain.service';
import { TransactionBody } from './models/body/transaction-body';
import { UseFilters, Controller, Get, Post, Body } from '@nestjs/common';
import { DomainExceptionFilter } from '../core/errors/domain-exception.filter';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Multichain')
@Controller('Multichain')
@UseFilters(new DomainExceptionFilter())
export class MultichainController {

    constructor(
        private readonly multiChainService: MultiChainService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Retrieve Addresses' })
    @ApiResponse({ status: 200, description: 'Addresses retrieved' })
    @ApiResponse({ status: 400, description: 'Addresses retrieval failed' })
    async retrieveAddresses() {
        return this.multiChainService.getAddress();
    }

    @Post('grant')
    @ApiOperation({ summary: 'Grant Permission' })
    @ApiResponse({ status: 200, description: 'Permission granted' })
    @ApiResponse({ status: 400, description: 'Permission grant failed' })
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
        return this.multiChainService.createTransaction(body.stream, v4(), body.data);
    }
}
