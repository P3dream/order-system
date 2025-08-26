import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cfg = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Payment Service API')
    .setDescription('API documentation for the payment service')
    .setVersion('1.0')
    .addTag('Payments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // RabbitMQ microservice setup
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [cfg.get<string>('RABBITMQ_URI') as string],
      queue: cfg.get<string>('RABBITMQ_QUEUE') as string,
      queueOptions: { durable: true },
      noAck: false,
      prefetchCount: 1,
    },
  });

  await app.startAllMicroservices();

  const port = process.env.PORT ?? 4001;
  await app.listen(port);
  console.log(`Payment Service listening (HTTP) at http://localhost:${port}/api`);
  console.log('RMQ consumer is active and listening for events');
}

bootstrap();
