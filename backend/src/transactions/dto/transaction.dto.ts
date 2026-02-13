import { IsNotEmpty, IsNumber, Min, IsString, Length, IsOptional, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
    @IsNumber()
    @Min(0.01)
    amount: number;

    @IsString()
    @Length(3, 3)
    currency: string;
}

export class PaginationQueryDto {
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @Max(100)
    limit: number = 10;
}
