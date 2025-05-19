import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { SingInDto } from './dto/sign-in.dto';
import { auth } from 'src/lib/auth';
import { generateUniqueUsername } from 'src/common/helpers';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async singUp(@Body() createUserDto: SignUpDto, @Res() res: Response) {
    const data = await this.authService.createUser(createUserDto);
    const setCookie = data['set-cookie'];

    console.log(setCookie);

    res.setHeader('Set-Cookie', setCookie);

    return res.json({
      message: 'User created successfully',
      data: data.user,
    });
  }

  @Post('sign-in')
  async signIn(@Body() signInUserDto: SingInDto): Promise<ApiResponse<User>> {
    // const user =
    //   await this.authService.findUserByEmailAndPassword(signInUserDto);

    // console.log(user);

    const test = await auth.api.signInEmail({
      body: {
        email: signInUserDto.email,
        password: signInUserDto.password,
      },
    });

    return {
      message: 'User signed in successfully',
      data: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }
}
