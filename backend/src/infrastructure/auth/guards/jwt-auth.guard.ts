// jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCookieAuth } from '@nestjs/swagger';

@Injectable()
@ApiCookieAuth()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // canActivate(context: ExecutionContext) {
  //   console.log('JWT Auth Guard: Checking authentication');
  //   const request = context.switchToHttp().getRequest();
  //   console.log('Cookies:', request.cookies);
  //   return super.canActivate(context);
  // }
}
