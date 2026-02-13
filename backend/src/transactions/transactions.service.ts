import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionStatus } from './transaction.entity';
import { CreateTransactionDto, PaginationQueryDto } from './dto/transaction.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.module';
import Redis from 'ioredis';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        private rabbitMQService: RabbitMQService,
        @Inject('REDIS_CLIENT') private redisClient: Redis,
    ) { }

    async create(userId: string, createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const transaction = this.transactionRepository.create({
            ...createTransactionDto,
            merchantId: userId,
            status: TransactionStatus.PENDING,
        });

        const savedTransaction = await this.transactionRepository.save(transaction);

        // Publish event
        await this.rabbitMQService.publish('transaction_created', savedTransaction);

        // Invalidate cache for this user's list (simple approach: clear all list keys for user)
        // For simplicity, we just let short TTL handle it or clear specific keys if we tracked them.
        // Here we'll clear by pattern
        const keys = await this.redisClient.keys(`transactions:${userId}:*`);
        if (keys.length > 0) {
            await this.redisClient.del(...keys);
        }

        return savedTransaction;
    }

    async findAll(userId: string, paginationQuery: PaginationQueryDto) {
        const { page, limit } = paginationQuery;
        const cacheKey = `transactions:${userId}:${page}:${limit}`;

        // Check cache
        const cachedData = await this.redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const [data, total] = await this.transactionRepository.findAndCount({
            where: { merchantId: userId },
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        const result = { data, total, page, limit, totalPages: Math.ceil(total / limit) };

        // Cache result with TTL (e.g., 60 seconds)
        await this.redisClient.set(cacheKey, JSON.stringify(result), 'EX', 60);

        return result;
    }
}
