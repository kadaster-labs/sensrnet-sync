import { Body, Query, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DomainException } from '../core/errors/domain-exception';
import { DomainExceptionFilter } from '../core/errors/domain-exception.filter';
import { ApproveBody } from './model/approve-body';
import { GrantBody } from './model/grant-body';
import { KeyParams } from './model/key-params';
import { StreamBody } from './model/stream-body';
import { TransactionBody } from './model/transaction-body';
import { MultiChainService } from './multichain.service';

@ApiBearerAuth()
@ApiTags('Multichain')
@Controller('Multichain')
@UseFilters(new DomainExceptionFilter())
export class MultiChainController {
    constructor(private readonly multiChainService: MultiChainService) {}

    @Get('address')
    @ApiOperation({ summary: 'Retrieve Addresses' })
    @ApiResponse({ status: 200, description: 'Addresses retrieved' })
    @ApiResponse({ status: 400, description: 'Addresses retrieval failed' })
    async retrieveAddresses(): Promise<string[]> {
        try {
            return await this.multiChainService.getAddresses();
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    @Get('key')
    @ApiOperation({ summary: 'Retrieve Private Key' })
    @ApiResponse({ status: 200, description: 'Private Key retrieved' })
    @ApiResponse({ status: 400, description: 'Private Key retrieval failed' })
    async retrievePrivateKey(@Query() params: KeyParams): Promise<string> {
        try {
            return await this.multiChainService.getPrivateKey(params.address);
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    @Post('grant')
    @ApiOperation({ summary: 'Grant Permission' })
    @ApiResponse({ status: 200, description: 'Permission granted' })
    @ApiResponse({ status: 400, description: 'Permission grant failed' })
    async grant(@Body() body: GrantBody): Promise<void> {
        try {
            return await this.multiChainService.grant(body.address, body.permissions);
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    @Post('stream')
    @ApiOperation({ summary: 'Create Stream' })
    @ApiResponse({ status: 200, description: 'Stream created' })
    @ApiResponse({ status: 400, description: 'Stream creation failed' })
    async createStream(@Body() body: StreamBody): Promise<void> {
        try {
            return await this.multiChainService.createStream(body.name);
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    @Post('transaction')
    @ApiOperation({ summary: 'Create Transaction' })
    @ApiResponse({ status: 200, description: 'Transaction created' })
    @ApiResponse({ status: 400, description: 'Transaction creation failed' })
    async createTransaction(@Body() body: TransactionBody): Promise<void> {
        try {
            return await this.multiChainService.createTransaction(body.stream, body.key, body.data);
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    @Post('approve')
    @ApiOperation({ summary: 'Approve Filter' })
    @ApiResponse({ status: 200, description: 'Filter approved' })
    @ApiResponse({ status: 400, description: 'Filter approval failed' })
    async approveFilter(@Body() body: ApproveBody): Promise<void> {
        try {
            return await this.multiChainService.approveFrom(body.address, body.filterName, true);
        } catch (e) {
            throw new DomainException(e.message);
        }
    }

    @Post('disapprove')
    @ApiOperation({ summary: 'Disapprove Filter' })
    @ApiResponse({ status: 200, description: 'Filter disapproved' })
    @ApiResponse({ status: 400, description: 'Filter disapproval failed' })
    async disapproveFilter(@Body() body: ApproveBody): Promise<void> {
        try {
            return await this.multiChainService.approveFrom(body.address, body.filterName, false);
        } catch (e) {
            throw new DomainException(e.message);
        }
    }
}
