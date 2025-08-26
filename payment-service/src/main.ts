import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cfg = app.get(ConfigService);
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
  await app.listen(4001);
  console.log('Payment Service listening (HTTP) on http://localhost:4001 and RMQ consumer ativo');
}
bootstrap();