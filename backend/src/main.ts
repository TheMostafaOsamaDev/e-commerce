import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable transformations and validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Shoop E-commerce API')
    .setDescription('API documentation for Shoop E-commerce application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Add global prefix for all routes
  // app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
