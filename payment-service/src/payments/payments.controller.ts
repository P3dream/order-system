import { Controller, Logger, Get, Param } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { PaymentService } from './payments.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private readonly service: PaymentService) {}

  @EventPattern('order.created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.service.processPayment(data);
      channel.ack(originalMsg); // Acknowledge message
    } catch (err) {
      this.logger.error('Failed to process payment', err);
      channel.nack(originalMsg, false, false); // Reject message without requeue
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve payment by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Payment ID' })
  @ApiResponse({ status: 200, description: 'Payment found' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
