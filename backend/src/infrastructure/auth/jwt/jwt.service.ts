import { Injectable } from '@nestjs/common';
import { JwtService as NestJsJwtService } from '@nestjs/jwt';
import { UserEntity } from '../../../domain/auth/user.entity';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJsJwtService) {}

  // TODO: Implement a method to generate a hashed token with Database
  async generate(payload: UserEntity) {
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

    return this.jwtService.sign(userEntity);
  }

  // TODO: Implement a method to verify the token
}
