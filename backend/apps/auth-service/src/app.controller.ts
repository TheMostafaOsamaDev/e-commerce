import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign-in.dto';

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

    const cachedUser = await this.appService.cacheSessions({ userData });

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

    const cachedUser = await this.appService.cacheSessions({ userData });

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
}
