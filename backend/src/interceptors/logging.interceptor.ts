import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    // Log request details
    const { method, url } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        // Log response details
        const statusCode = response.statusCode;
        const responseTime = Date.now() - startTime;
        this.logger.log(
          `${method} ${url} - Status: ${statusCode} - ${responseTime}ms`,
        );
      }),
    );
  }
}

export const LoggingInterceptorProvider = {
  provide: 'APP_INTERCEPTOR',
  useClass: LoggingInterceptor,
};
