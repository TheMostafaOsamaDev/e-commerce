import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as NestJsJwtModule } from '@nestjs/jwt';
import {
  JWT_EXPIRATION_TIME,
  JWT_SECRET,
} from '../../../common/constants/constants';
import { JwtProviders } from './jwt.providers';

@Module({
  imports: [
    NestJsJwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION_TIME },
    }),
  ],
  providers: [JwtService, ...JwtProviders],
  exports: [JwtService],
})
export class JwtModule {}
