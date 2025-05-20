import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { fromNodeHeaders } from 'better-auth/node';
import { Request } from 'express';
import { auth } from 'src/lib/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const data = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    const userId = data?.user?.id;

    if (!this.handleAlreadyLoggedIn(req, userId)) {
      throw new ConflictException('Already logged in');
    }

    req.user = data?.user;

    return req.user;
  }

  handleAlreadyLoggedIn(req: Request, userId: string | undefined) {
    const url = req.url;
    const isAuthRoute =
      url.includes('/auth/sign-in') || url.includes('/auth/sign-up');

    if (userId && isAuthRoute) {
      return false;
    }

    return true;
  }
}
