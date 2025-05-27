import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { FRONTEND_URL } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: FRONTEND_URL,
    credentials: true,
  });

  app.use(cookieParser());

  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
