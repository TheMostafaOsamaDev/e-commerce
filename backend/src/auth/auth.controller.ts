import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { SingInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async singUp(@Body() createUserDto: SignUpDto): Promise<ApiResponse<User>> {
    const user = await this.authService.createUser(createUserDto);

    return {
      message: 'User created successfully',
      data: user,
    };
  }

  @Post('sign-in')
  async signIn(@Body() signInUserDto: SingInDto): Promise<ApiResponse<User>> {
    const user =
      await this.authService.findUserByEmailAndPassword(signInUserDto);

    console.log(user);

    return {
      message: 'User signed in successfully',
      data: user,
    };
  }
}
