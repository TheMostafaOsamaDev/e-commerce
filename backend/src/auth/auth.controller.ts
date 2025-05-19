import { Body, Catch, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SingInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { BetterAuthExceptionFilter } from 'src/common/filters/better-auth-exception.filter';

@Catch(BetterAuthExceptionFilter)
@Controller('auth')
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
  async signIn(@Body() signInUserDto: SingInDto, @Res() res: Response) {
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
}
