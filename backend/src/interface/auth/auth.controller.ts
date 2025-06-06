import { Body, Controller, Post } from '@nestjs/common';
import { AuthRoutes } from '../../common/constants/routes';
import { SignUpDto } from '../../application/auth/dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  @Post(AuthRoutes.SIGN_UP)
  signUp(@Body() signUpDto: SignUpDto) {
    // Logic for user registration
  }
}
