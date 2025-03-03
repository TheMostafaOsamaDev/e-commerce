import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  EventPattern,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as jwt from 'jsonwebtoken';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User, UserType } from './models/user.model';
import { Session } from './models/session.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_account' })
  async createAccount(data: CreateAuthDto) {
    const user = await this.appService.createUser(data);

    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: false,
    };

    const cachedUser = await this.appService.createSession({ userData });

    const token = this.appService.generateToken({
      userData: cachedUser.user,
      isHashed: false,
      authedAt: cachedUser.authedAt,
    });

    return {
      ...cachedUser,
      token,
    };
  }

  @MessagePattern({ cmd: 'sign_in' })
  async signIn(data: SignInDto) {
    const user = await this.appService.signIn(data);

    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: false,
    };

    const cachedUser = await this.appService.createSession({ userData });

    const token = this.appService.generateToken({
      userData,
      isHashed: false,
      authedAt: cachedUser.authedAt,
    });

    return {
      user,
      token,
    };
  }

  @MessagePattern({ cmd: 'verify_token' })
  async verifyToken(token: string) {
    return this.appService.verifyToken(token);
  }

  @EventPattern('signout_user')
  async logoutUser(token: string) {
    if (!token) {
      throw new RpcException({
        code: 401,
        message: 'Unauthorized',
      });
    }

    const decodedUser = jwt.decode(token) as {
      email: string;
      authedAt: string;
    };

    console.log({
      email: decodedUser.email,
      authedAt: decodedUser.authedAt,
    });

    if (decodedUser?.email && decodedUser?.authedAt)
      await this.appService.destroySession(
        decodedUser.email,
        decodedUser.authedAt,
      );
  }

  @MessagePattern({ cmd: 'update_profile' })
  async updateProfile(data: UpdateAuthDto) {
    const user = await User.findOne({ where: { id: data.id } });
    const decodedUser = jwt.decode(data.token) as { authedAt: string };

    if (!user || !data.token || !decodedUser?.authedAt) {
      throw new RpcException({
        code: 404,
        message: 'User not found',
      });
    }

    let hasChanged = false;

    for (const key of Object.keys(data)) {
      if (data[key] && data[key] !== 'id' && user[key]) {
        if (user[key] !== data[key]) {
          hasChanged = true;
          user[key] = data[key];
        }
      }
    }

    if (hasChanged) {
      await user.save();

      const cachedUser = await this.appService.createSession({
        userData: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
        },
      });

      const token = this.appService.generateToken({
        userData: cachedUser.user,
        isHashed: false,
        authedAt: cachedUser.authedAt,
      });

      await this.appService.destroySession(user.email, decodedUser.authedAt);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
        isNew: true,
      };
    }

    return {
      message: 'No changes made',
    };
  }
}
