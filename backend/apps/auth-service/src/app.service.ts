import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User, UserType } from './user.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AUTH_TTL, TOKEN_TIME } from './config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async createUser(data: CreateAuthDto) {
    const [user, created] = await User.findOrCreate({
      where: { email: data.email },
      defaults: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    const userData = user.get({ plain: true });

    return {
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
  }

  async cacheSessions({ userData }: { userData: UserType }) {
    const key = `${userData.email}`;

    const token = this.generateToken({ userData, isHashed: true });

    await this.cacheManager.set(key, { ...userData, token }, AUTH_TTL);

    return {
      token,
      user: userData,
    };
  }

  generateToken({
    userData,
    isHashed,
  }: {
    userData: UserType;
    isHashed: boolean;
  }) {
    const expiresIn = AUTH_TTL | TOKEN_TIME;

    const token = jwt.sign(userData, process.env.TOKEN_SECRET!, { expiresIn });

    if (isHashed) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(token, salt);

      return hash;
    }

    return token;
  }
}
