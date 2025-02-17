import { Body, Controller, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';

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
    };

    console.log(user);

    const cachedUser = await this.appService.cacheSessions({ userData });

    console.log(cachedUser);

    const token = this.appService.generateToken({
      userData: cachedUser.user,
      isHashed: false,
    });

    return {
      ...cachedUser,
      token,
    };
  }
}
