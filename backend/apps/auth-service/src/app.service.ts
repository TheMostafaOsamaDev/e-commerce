import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User, UserType } from './user.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AUTH_TTL, TOKEN_TIME } from './config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async createUser(data: CreateAuthDto) {
    const [user, _] = await User.findOrCreate({
      where: { email: data.email },
      defaults: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        isAdmin: false,
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

  async signIn(signInDto: SignInDto) {
    const user = await User.findOne({
      where: { email: signInDto.email },
    });

    if (!user) {
      // throw new NotFoundException('User not found');
      throw new RpcException({
        statusCode: 404,
        message: 'User not found',
      });
    }

    const isMatched = await user.comparePassword(signInDto.password);

    if (!isMatched) {
      // throw new BadRequestException('Invalid credentials');
      throw new RpcException({
        statusCode: 400,
        message: 'Invalid credentials',
      });
    }

    const userData = user.get({ plain: true });

    console.log(userData);

    return {
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
  }

  async cacheSessions({ userData }: { userData: UserType }) {
    const authedAt = new Date().toISOString();
    const key = `${userData.email}-${authedAt}`;

    const token = this.generateToken({ userData, isHashed: true, authedAt });

    await this.cacheManager.set(key, { ...userData, token }, AUTH_TTL);

    return {
      token,
      user: userData,
      authedAt,
    };
  }

  generateToken({
    userData,
    isHashed,
    authedAt,
  }: {
    userData: UserType;
    isHashed: boolean;
    authedAt: string;
  }) {
    const expiresIn = AUTH_TTL | TOKEN_TIME;
    const TOKEN_SECRET = isHashed
      ? process.env.TOKEN_SECRET!
      : process.env.CLIENT_TOKEN_SECRET!;

    const token = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        authedAt,
      },
      TOKEN_SECRET,
      { expiresIn },
    );

    if (isHashed) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(token, salt);

      return hash;
    }

    return token;
  }

  compareToken(userData: UserType, hashedToken: string) {
    const token = this.generateToken({
      userData,
      isHashed: false,
      authedAt: userData.authedAt || '',
    });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(token, salt);

    return bcrypt.compareSync(token, hash);
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.CLIENT_TOKEN_SECRET!, {
        ignoreExpiration: true,
      });

      const user: UserType = decoded as UserType;

      if (user) {
        const key = `${user.email}-${user.authedAt}`;

        const cachedUser: (UserType & { token: string }) | null =
          await this.cacheManager.get(key);

        if (!cachedUser) {
          throw new RpcException({
            statusCode: 401,
            message: 'Unauthorized',
          });
        }
        console.log(cachedUser);

        console.log({
          token,
          cachedToken: cachedUser.token,
        });

        const userPayload = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
        };

        const isMatched = this.compareToken(userPayload, cachedUser.token);

        if (!isMatched) {
          throw new RpcException({
            statusCode: 401,
            message: 'Unauthorized',
          });
        }

        // check expiration
        const currentTime = Math.floor(Date.now() / 1000);
        const exp = (decoded as jwt.JwtPayload).exp || 0;

        if (exp < currentTime) {
          const key = `${user.email}-${user.authedAt}`;
          await this.cacheManager.del(key);

          // new hash token
          const newCachedUser = await this.cacheSessions({
            userData: userPayload,
          });

          const newToken = this.generateToken({
            userData: userPayload,
            isHashed: false,
            authedAt: newCachedUser.authedAt,
          });

          return {
            ...newCachedUser,
            token: newToken,
            isNew: true,
          };
        } else {
          return {
            ...cachedUser,
            token,
            isNew: false,
          };
        }
      }

      return decoded;
    } catch (e) {
      console.log(e);
      throw new RpcException({
        statusCode: 401,
        message: 'Invalid token',
      });
    }
  }
}
