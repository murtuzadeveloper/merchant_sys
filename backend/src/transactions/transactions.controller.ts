import { Controller, Get, Post, Body, UseGuards, Request, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, PaginationQueryDto } from './dto/transaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionsService.create(req.user.userId, createTransactionDto);
    }

    @Get()
    findAll(@Request() req, @Query() query: PaginationQueryDto) {
        return this.transactionsService.findAll(req.user.userId, query);
    }
}
