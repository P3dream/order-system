import { IsEmail, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Customer email address',
    example: 'customer@example.com',
  })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({
    description: 'Order amount (must be at least 1)',
    example: 100,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  amount: number;
}