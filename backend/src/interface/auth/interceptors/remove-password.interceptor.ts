// interface/auth/interceptors/remove-password.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const userData = data.user || data; // Handle both single user and list of users
        if (userData && typeof userData === 'object') {
          // Remove password field from single object
          if ('hashPassword' in userData) {
            const { hashPassword, ...rest } = data;

            return rest;
          }
          // Handle arrays of objects (e.g., list of users)
          if (Array.isArray(data)) {
            return data.map((item) => {
              if ('hashPassword' in item) {
                const { hashPassword, ...rest } = item;
                return rest;
              }
              return item;
            });
          }
        }
        return data;
      }),
    );
  }
}
