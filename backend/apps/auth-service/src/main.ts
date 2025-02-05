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
        urls: ['amqp://guest:guest@rabbitmq:5672'], // RabbitMQ URL from Docker
        queue: 'auth_queue', // Define a queue for auth-service
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  Logger.warn('Auth-Service is running...');

  await app.listen();
}
bootstrap();
