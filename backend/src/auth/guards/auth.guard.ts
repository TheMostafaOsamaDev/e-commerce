import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from 'src/lib/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const url = req.url;
    const isAuthRoute =
      url.includes('/auth/sign-in') || url.includes('/auth/sign-up');
    const data = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    const userId = data?.user?.id;
    const isAlreadyLoggedIn = this.handleAlreadyLoggedIn(isAuthRoute, userId);
    if (isAlreadyLoggedIn) {
      throw new ConflictException('Already logged in');
    } else if (isAuthRoute) {
      return true;
    }

    req.user = data?.user;

    return req.user;
  }

  handleAlreadyLoggedIn(isAuthRoute: boolean, userId: string | undefined) {
    if (userId && isAuthRoute) {
      return true;
    }

    return false;
  }
}
