import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}

  async create(dto: CreateOrderDto) {
    const order = this.repo.create({
      customerEmail: dto.customerEmail,
      amount: dto.amount,
      status: 'pending',
    });

    const saved = await this.repo.save(order);

    this.paymentClient.emit('order.created', {
      orderId: saved.id,
      amount: saved.amount,
      customerEmail: saved.customerEmail,
    });

    return saved;
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
