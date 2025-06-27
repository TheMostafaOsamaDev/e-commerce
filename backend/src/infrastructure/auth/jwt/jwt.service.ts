import { Injectable } from '@nestjs/common';
import { JwtService as NestJsJwtService } from '@nestjs/jwt';
import { UserEntity } from '../../../domain/auth/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(
    private jwtService: NestJsJwtService,
    private configService: ConfigService,
  ) {}

  signAccessToken(payload: UserEntity) {
    const userEntity = {
      id: payload.id,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      username: payload.username,
      isAdmin: payload.isAdmin,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    };

    return this.jwtService.sign(userEntity, {
      expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
    });
  }

  signRefreshToken(payload: UserEntity) {
    const userEntity = {
      id: payload.id,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      username: payload.username,
      isAdmin: payload.isAdmin,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    };

    return this.jwtService.sign(userEntity, {
      expiresIn: this.configService.get<string>(
        'REFRESH_TOKEN_EXPIRATION_TIME',
      ), // Refresh tokens typically have a longer expiration time
    });
  }
}
