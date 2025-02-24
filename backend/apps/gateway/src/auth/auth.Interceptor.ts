import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { TOKEN_TIME } from 'src/config';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();

    return next.handle().pipe(
      tap((body) => {
        if (body && body.token) {
          res.cookie('auth_token', body.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: TOKEN_TIME,
          });

          return body;
        }
      }),
      map((body) => (body?.user ? body.user : body)),
    );
  }
}
