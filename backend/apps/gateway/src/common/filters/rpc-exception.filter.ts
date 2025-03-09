import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error: any = exception.getError();
    const status = error.status || error.statusCode || 500;
    const message = error.message || 'Internal server error';

    response.status(status).json({
      status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
