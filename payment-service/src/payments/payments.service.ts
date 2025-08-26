import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/order.entity';

type OrderCreatedEvent = { orderId: string; amount: number; customerEmail: string };

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(@InjectRepository(Order) private readonly repo: Repository<Order>) {}

  async processPayment(evt: OrderCreatedEvent) {
    this.logger.log(`Processando pagamento do pedido ${evt.orderId} - R$ ${evt.amount}`);

    await sleep(1000); // Simulando um processamento lento

    await this.repo.update({ id: evt.orderId }, { status: 'paid' });

    this.logger.log(`Pagamento concluído para ${evt.orderId}`);
  }
  async findOne(id: string) {
    return await this.repo.findOneBy({ id });
  }

}