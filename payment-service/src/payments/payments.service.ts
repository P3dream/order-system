import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../orders/order.entity';

type OrderCreatedEvent = { orderId: string; amount: number; customerEmail: string };

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(@InjectRepository(Order) private readonly repo: Repository<Order>) {}

  async processPayment(evt: OrderCreatedEvent) {
  this.logger.log(`Processing payment for order ${evt.orderId} - $${evt.amount}`);

  await sleep(1000); // simulate payment delay

  await this.repo.update(
    { id: evt.orderId },
    { status: OrderStatus.PAID }
  );

  this.logger.log(`Payment completed for order ${evt.orderId}`);
}
  async findOne(id: string) {
    return await this.repo.findOneBy({ id });
  }

}