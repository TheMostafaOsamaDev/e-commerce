import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { BetterAuthExceptionFilter } from 'src/common/filters/better-auth-exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { Response } from 'express';
import { UserRequest } from 'types/express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from 'src/lib/auth';
import { SESSION_COOKIE_NAME } from 'src/common/config';

@Catch(BetterAuthExceptionFilter)
@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async singUp(@Body() createUserDto: SignUpDto, @Res() res: Response) {
    const data = await this.authService.createUser(createUserDto);
    const setCookie = data['set-cookie'];

    res.setHeader('Set-Cookie', setCookie);

    return res.json({
      message: 'User created successfully',
      data: data.user,
    });
  }

  @Post('sign-in')
  async signIn(@Body() signInUserDto: SignInDto, @Res() res: Response) {
    const data =
      await this.authService.findUserByEmailAndPassword(signInUserDto);

    const setCookie = data['set-cookie'];

    res.setHeader('Set-Cookie', setCookie);
    const user = data.user;

    return res.json({
      message: 'User logged in successfully',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }

  @Get('me')
  async getMe(@Req() req: UserRequest) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      message: 'User retrieved successfully',
      data: {
        id: user.id,
        image: user.image || null,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  @Delete('sign-out')
  async signOut(@Req() req: UserRequest, @Res() res: Response) {
    const fromHeaders = fromNodeHeaders(req.headers);

    await auth.api.signOut({
      headers: fromHeaders,
    });

    res.setHeader(
      'Set-Cookie',
      `${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0;`,
    );

    return res.json({
      message: 'User logged out successfully',
    });
  }
}
