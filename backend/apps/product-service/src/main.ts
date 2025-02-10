import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!], // RabbitMQ URL from Docker
        queue: process.env.RABBITMQ_QUEUE!, // Define a queue for auth-service
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  Logger.warn('Product-Service is running...');

  await app.listen();
}
bootstrap();
