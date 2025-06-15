import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userProviders } from '../../infrastructure/auth/user.providers';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { SignUpUseCase } from '../../application/auth/use-cases/sign-up.use-case';
import { bcryptHasherProviders } from '../../infrastructure/cryptography/bcrypt-hasher.providers';
import { SignInUseCase } from '../../application/auth/use-cases/sign-in.use-case';
import { JwtStrategy } from '../../infrastructure/auth/strategies/jwt.strategy';
import { JwtModule } from '../../infrastructure/auth/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../infrastructure/auth/strategies/local.strategy';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SignUpUseCase,
    SignInUseCase,
    LocalStrategy,
    JwtStrategy,
    ...userProviders,
    ...bcryptHasherProviders,
  ],
})
export class AuthModule {}
