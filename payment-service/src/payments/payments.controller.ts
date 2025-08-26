import { Controller, Logger, Get, Param } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { PaymentService } from './payments.service';

@Controller('payments') // agora o controller tem prefixo /payments
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private readonly service: PaymentService) {}

  // Listener RabbitMQ
  @EventPattern('order.created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.service.processPayment(data);
      channel.ack(originalMsg); // confirma a mensagem
    } catch (err) {
      this.logger.error('Falha ao processar pagamento', err);
      channel.nack(originalMsg, false, false); // Nack sem requeue
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
