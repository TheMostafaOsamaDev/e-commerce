import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../../../common/constants/constants';
import { UserEntity } from '../../../domain/auth/user.entity';
import { extractJwtFromCookie } from '../../../common/utils/jwt-cookie-extractor.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('Initializing JWT Strategy with secret');
    super({
      jwtFromRequest: extractJwtFromCookie,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(
    payload: Pick<
      UserEntity,
      'id' | 'firstName' | 'lastName' | 'email' | 'isAdmin' | 'username'
    >,
  ) {
    console.log('Validating JWT payload:', payload);
    return payload;
  }
}
