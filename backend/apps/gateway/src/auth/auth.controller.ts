import {
  Body,
  Controller,
  Delete,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
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
  async verify(@Req() req: Request) {
    const user = req.verifiedUser;

    if (user) {
      return {
        user: {
          id: user.data.id,
          email: user.data.email,
          firstName: user.data.firstName,
          lastName: user.data.lastName,
        },
        token: user.isNew ? user.token : null,
      };
    }

    console.log('User: ');
    console.log(user);

    throw new UnauthorizedException('Unauthorized');
  }

  @Delete('sign-out')
  @UseGuards(AuthGuard)
  async signOut(@Req() req: Request, @Res() res: Response) {
    const user = req.verifiedUser;

    console.log(user);

    return res.send('Testing phase');
  }
}
