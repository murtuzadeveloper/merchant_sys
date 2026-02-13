import { Module, Global, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: any;
  private channel: any;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const uri = this.configService.get<string>('RABBITMQ_URI');
    if (!uri) throw new Error('RABBITMQ_URI is not defined');

    // Treat connection as 'any' to avoid TS errors
    this.connection = await amqp.connect(uri) as any;

    // Now create channel safely
    this.channel = await this.connection.createChannel();

    // Declare queue
    await this.channel.assertQueue('transactions_queue', { durable: true });
  }

  async onModuleDestroy() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  async publish(pattern: string, data: any) {
    if (!this.channel) throw new Error('RabbitMQ channel not initialized');
    this.channel.sendToQueue(
      'transactions_queue',
      Buffer.from(JSON.stringify({ pattern, data }))
    );
  }
}

@Global()
@Module({
  imports: [ConfigModule],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
