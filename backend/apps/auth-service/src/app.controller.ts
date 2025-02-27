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

    if (decodedUser?.email && decodedUser?.authedAt)
      await this.appService.destroySession(
        decodedUser.email,
        decodedUser.authedAt,
      );
  }
}
