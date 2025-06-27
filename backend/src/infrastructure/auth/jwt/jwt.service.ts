import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJsJwtService } from '@nestjs/jwt';
import { UserEntity } from '../../../domain/auth/user.entity';
import { ConfigService } from '@nestjs/config';
import { DB_Providers } from '../../../common/constants/providers.constants';
import { IRefreshTokenRepository } from '../../../domain/auth/interfaces/refresh-token.repository.interface';

@Injectable()
export class JwtService {
  constructor(
    private jwtService: NestJsJwtService,
    private configService: ConfigService,
    @Inject(DB_Providers.REFRESH_TOKEN_REPOSITORY)
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  // Signing
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
      secret: this.configService.get<string>('JWT_SECRET'),
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
      // expiresIn: this.configService.get<string>(
      //   'REFRESH_TOKEN_EXPIRATION_TIME',
      // ), // Refresh tokens typically have a longer expiration time
      expiresIn: '5s', // 30 days
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    });
  }

  // Verifying
  verifyAccessToken(token: string) {
    try {
      return this.jwtService.verify<UserEntity>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      return false;
    }
  }

  async verifyRefreshToken(token: string, ipAddress: string) {
    try {
      const data = await this.refreshTokenRepository.findByToken(token);

      if (!data) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      if (data.ipAddress !== ipAddress) {
        throw new UnauthorizedException('IP address mismatch');
      }
      return this.jwtService.verify<UserEntity>(token, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
