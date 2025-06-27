// jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCookieAuth } from '@nestjs/swagger';
import { JwtService } from '../jwt/jwt.service';
import { ConfigService } from '@nestjs/config';
import {
  JWT_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_EXPIRATION,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../../../common/constants/constants';

@Injectable()
@ApiCookieAuth()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    console.log('JWT Auth Guard: Checking authentication');
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const accessToken = request.cookies[JWT_COOKIE_NAME];
    const refreshToken = request.cookies[REFRESH_TOKEN_COOKIE_NAME];
    const ipAddress = request.ip === '::1' ? '127.0.0.1' : request.ip;

    // console.log(`JWT Auth Guard: Access Token: ${accessToken}`);
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // console.log(`JWT Auth Guard: Refresh Token: ${refreshToken}`);

    if (!accessToken && !refreshToken) {
      return false; // No token found, cannot activate guard
    }

    // If access token is present, validate it
    const isAccessTokenValid = this.jwtService.verifyAccessToken(accessToken);

    if (isAccessTokenValid) {
      request.user = isAccessTokenValid; // Attach user info to request
    }

    // If access token is not valid, check refresh token
    const isRefreshTokenValid = await this.jwtService.verifyRefreshToken(
      refreshToken,
      ipAddress,
    );

    if (!isRefreshTokenValid) {
      // Delete cookies if refresh token is invalid
      response.clearCookie(JWT_COOKIE_NAME);
      response.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

      return false; // Refresh token is invalid, cannot activate guard
    }

    // If refresh token is valid, generate new access token
    const newAccessToken = this.jwtService.signAccessToken(isRefreshTokenValid);

    console.log(`New Access Token: ${newAccessToken}`);

    response.cookie(JWT_COOKIE_NAME, newAccessToken, {
      maxAge: REFRESH_TOKEN_COOKIE_EXPIRATION, // Use the configured expiration time
      httpOnly: true,
    });

    request.user = isRefreshTokenValid; // Attach user info to request

    return true;
  }
}
