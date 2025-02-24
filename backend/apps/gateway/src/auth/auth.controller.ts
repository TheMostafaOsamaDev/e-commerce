import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthInterceptor } from './auth.Interceptor';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';

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

  @Post('verify')
  @UseGuards(AuthGuard)
  @UseInterceptors(AuthInterceptor)
  async verify(@Req() req: Request, @Res() res: Response) {
    const user = req.user;

    if (user)
      return res.status(200).send({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });

    res.status(401).send({
      message: 'Unauthorized',
      status: 401,
    });
  }
}
