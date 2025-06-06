import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userProviders } from '../../infrastructure/auth/user.providers';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { SignUpUseCase } from '../../application/auth/use-cases/sign-up.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, SignUpUseCase, ...userProviders],
})
export class AuthModule {}
