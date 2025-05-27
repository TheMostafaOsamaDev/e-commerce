// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../interfaces/response.interface';

@Catch(HttpException)
export class BetterAuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Check if the response is already in ApiResponse format
    if (this.isApiResponse(exceptionResponse)) {
      response.status(status).json(exceptionResponse);
      return;
    }

    // Transform the error response into ApiResponse format
    const apiResponse: ApiResponse<null> = {
      message: 'Error occurred',
      data: null,
      statusCode: status,
      errorMessage:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || 'An error occurred',
    };

    // Handle specific error codes if needed
    if (
      status === 401 &&
      typeof exceptionResponse === 'object' &&
      (exceptionResponse as any).body?.code === 'INVALID_EMAIL_OR_PASSWORD'
    ) {
      apiResponse.message = 'Authentication failed';
      apiResponse.errorMessage = (exceptionResponse as any).body.message;
    }

    response.status(status).json(apiResponse);
  }

  private isApiResponse(response: any): response is ApiResponse<unknown> {
    return (
      response &&
      typeof response === 'object' &&
      'message' in response &&
      'data' in response &&
      (response.statusCode !== undefined || response.errorMessage !== undefined)
    );
  }
}
