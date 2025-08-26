import { IsEmail, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  customerEmail: string;

  @IsNumber()
  @Min(1)
  amount: number;
}