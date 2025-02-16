import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('sign-up')
  createAccount(@Body() data: CreateAuthDto) {
    return this.authClient.send({ cmd: 'create_account' }, data);
  }
}
