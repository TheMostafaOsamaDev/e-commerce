import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { sequelize } from './sequelize.config';

async function bootstrap() {
  await sequelize.authenticate();
  await sequelize.sync(); // Sync database tables

  Logger.log('Connected to MySQL & Synced Models');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!], // RabbitMQ URL from Docker
        queue: process.env.RABBITMQ_QUEUE! ?? 'auth_queue', // Define a queue for auth-service
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());

  Logger.warn('Auth-Service is running...');

  await app.listen();
}
bootstrap();
