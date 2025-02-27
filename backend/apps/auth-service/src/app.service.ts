import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User, UserType } from './models/user.model';
import { AUTH_TTL, TOKEN_TIME } from './config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { RpcException } from '@nestjs/microservices';
import { Session } from './models/session.model';

@Injectable()
export class AppService {
  constructor() {}

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

    return {
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
  }

  async createSession({ userData }: { userData: UserType }) {
    const authedAt = new Date().toISOString();
    const id = `${userData.email}-${authedAt}`;

    const token = this.generateToken({ userData, isHashed: true, authedAt });

    await Session.create({
      id,
      userId: userData.id,
      token,
      authedAt,
    });

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
    const expiresIn = isHashed ? AUTH_TTL : TOKEN_TIME;
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
        const id = `${user.email}-${user.authedAt}`;

        console.log(`ID: ${id}`);

        const userSession = await Session.findOne({
          where: { id },
        });

        if (!userSession) {
          throw new RpcException({
            statusCode: 401,
            message: 'Unauthorized ~ no cached user',
          });
        }

        const userPayload = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
        };

        const isMatched = this.compareToken(userPayload, userSession.token);

        if (!isMatched) {
          throw new RpcException({
            statusCode: 401,
            message: 'Unauthorized ~ token mismatch',
          });
        }

        // check expiration
        const currentTime = Math.floor(Date.now() / 1000);
        const exp = (decoded as jwt.JwtPayload).exp || 0;

        // Update last authed
        userSession.lastAuthedAt = new Date();
        await userSession.save();

        if (exp < currentTime) {
          const id = `${user.email}-${user.authedAt}`;
          await Session.destroy({
            where: { id },
          });

          // new hash token
          const newUserSession = await this.createSession({
            userData: userPayload,
          });

          const newToken = this.generateToken({
            userData: userPayload,
            isHashed: false,
            authedAt: newUserSession.authedAt,
          });

          return {
            data: newUserSession.user,
            token: newToken,
            isNew: true,
          };
        } else {
          return {
            data: userPayload,
            token,
            isNew: false,
          };
        }
      }

      return decoded;
    } catch (e) {
      throw new RpcException({
        statusCode: 401,
        message: e.message,
      });
    }
  }

  async destroySession(email: string, authedAt: string) {
    const id = `${email}-${authedAt}`;

    await Session.destroy({
      where: { id },
    });

    return {
      message: 'Session destroyed',
    };
  }
}
