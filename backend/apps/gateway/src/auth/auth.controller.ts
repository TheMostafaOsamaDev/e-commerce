import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthInterceptor } from './auth.Interceptor';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('sign-up')
  @UseInterceptors(AuthInterceptor)
  async createAccount(@Body() data: CreateAuthDto) {
    return this.authClient.send({ cmd: 'create_account' }, data);
  }

  @Post('sign-in')
  @UseInterceptors(AuthInterceptor)
  async signIn(@Body() data: SignInDto) {
    return this.authClient.send({ cmd: 'sign_in' }, data);
  }
}
