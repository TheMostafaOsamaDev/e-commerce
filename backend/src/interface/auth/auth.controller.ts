import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
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
import {
  JWT_COOKIE_EXPIRATION,
  JWT_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_EXPIRATION,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../../common/constants/constants';

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
  async signIn(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user = await this.authService.signIn(signInDto);
    const ipAddress = req.ip === '::1' ? '127.0.0.1' : req.ip;

    if (!ipAddress)
      throw new BadRequestException('Unable to determine IP address');

    const { accessToken, refreshToken } = await this.authService.generateTokens(
      ipAddress,
      user,
    );

    res.cookie(JWT_COOKIE_NAME, accessToken, {
      // maxAge: 5 * 1000, // 5 seconds = 5 * 1000,
      httpOnly: true,
    });

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      maxAge: REFRESH_TOKEN_COOKIE_EXPIRATION,
      httpOnly: true,
    });

    return res.json({
      message: 'Sign in successful',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  }

  @Get(AuthRoutes.PROFILE)
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() request: Request) {
    return request.user; // Assuming the user is attached to the request by the JwtStrategy
  }
}
