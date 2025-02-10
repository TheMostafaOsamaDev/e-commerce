import { Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post()
  createAccount(data: any) {
    console.log(data);
    this.authClient.send({ cmd: 'create_account' }, data);
  }
}
