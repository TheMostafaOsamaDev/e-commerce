import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers['auth_token'];

    const data = await this.authService.verifyToken(req);

    if (!data) {
      return false;
    }

    req.user = data;

    return true;
  }
}
