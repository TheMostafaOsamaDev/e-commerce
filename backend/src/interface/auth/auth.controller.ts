import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthRoutes } from '../../common/constants/routes.constants';
import { SignUpDto } from '../../application/auth/dtos/sign-up.dto';
import { SwaggerApiDecorator } from '../../common/decorator/swagger.decorator';
import {
  SignInApiResponses,
  SignUpApiResponses,
} from '../../common/constants/auth/auth.decorators.constants';
import { AuthService } from './auth.service';
import { SignInDto } from '../../application/auth/dtos/sign-in.dto';
import { RemovePasswordInterceptor } from './interceptors/remove-password.interceptor';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import { LocalGuard } from '../../infrastructure/auth/guards/local.guard';
import { ApiCookieAuth } from '@nestjs/swagger';

@Controller('auth')
@UseInterceptors(RemovePasswordInterceptor)
@ApiCookieAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthRoutes.SIGN_UP)
  @SwaggerApiDecorator(SignUpApiResponses)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post(AuthRoutes.SIGN_IN)
  @SwaggerApiDecorator(SignInApiResponses)
  @UseGuards(LocalGuard)
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.signIn(signInDto);

    const token = await this.authService.generateToken(user);

    return {
      user,
      accessToken: token,
    };
  }

  @Get(AuthRoutes.PROFILE)
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return req.user; // Assuming the user is attached to the request by the JwtStrategy
  }
}
