import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
