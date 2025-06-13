import { Body, Controller, Post } from '@nestjs/common';
import { AuthRoutes } from '../../common/constants/routes';
import { SignUpDto } from '../../application/auth/dtos/sign-up.dto';
import { SwaggerApiDecorator } from '../../common/decorator/awagger.decorator';
import {
  SignInApiResponses,
  SignUpApiResponses,
} from '../../common/constants/auth/auth.decorators.constants';
import { AuthService } from './auth.service';
import { SignInDto } from '../../application/auth/dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthRoutes.SIGN_UP)
  @SwaggerApiDecorator(SignUpApiResponses)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post(AuthRoutes.SIGN_IN)
  @SwaggerApiDecorator(SignInApiResponses)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
