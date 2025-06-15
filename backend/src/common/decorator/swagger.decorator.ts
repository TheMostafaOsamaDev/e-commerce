import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

export function SwaggerApiDecorator(responses: ApiResponseOptions[]) {
  return applyDecorators(
    ...responses.map((response) =>
      ApiResponse({
        status: response.status,
        description: response.description,
        headers: response.headers,
        content: response.content,
      }),
    ),
  );
}
