import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Inject,
  Patch,
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
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('sign-up')
  @UseInterceptors(AuthInterceptor)
  async createAccount(@Body() data: CreateAuthDto) {
    if (data.isAdmin && !data.passkey) {
      throw new BadRequestException('Admins must provide the passkey');
    }

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

    throw new UnauthorizedException('Unauthorized');
  }

  @Delete('sign-out')
  @UseGuards(AuthGuard)
  async signOut(@Req() req: Request, @Res() res: Response) {
    const user = req.verifiedUser;

    try {
      this.authClient.emit('signout_user', user.token);

      res.clearCookie('auth_token');
      res.clearCookie('sh_data');
    } catch (error) {
      console.log(error);
    }

    return res.send('Signed out');
  }

  @Patch('update')
  @UseGuards(AuthGuard)
  @UseInterceptors(AuthInterceptor)
  async updateProfile(@Req() req: Request, @Body() data: UpdateAuthDto) {
    const user = req.verifiedUser;

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.authClient.send(
      { cmd: 'update_profile' },
      { ...data, id: user?.data?.id, token: user.token },
    );
  }
}
