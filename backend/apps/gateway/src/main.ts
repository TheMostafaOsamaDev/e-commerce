import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBITMQ_URL } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL], // RabbitMQ connection
      queue: process.env.GATEWAY_QUEUE! ?? 'gateway_queue', // Gateway queue
      queueOptions: {
        durable: false,
      },
    },
  });

  app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
