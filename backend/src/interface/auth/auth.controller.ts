import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthRoutes } from '../../common/constants/routes';
import { SignUpDto } from '../../application/auth/dtos/sign-up.dto';
import { SwaggerApiDecorator } from '../../common/decorator/awagger.decorator';
import { SignUpApiResponses } from '../../common/constants/auth/auth.decorators.constants';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    // Dependency injection for authService
  }

  @Post(AuthRoutes.SIGN_UP)
  @SwaggerApiDecorator(SignUpApiResponses)
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);

    return user;
  }
}
