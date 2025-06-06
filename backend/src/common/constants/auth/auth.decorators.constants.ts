import { ApiResponseOptions } from '@nestjs/swagger';

export const SignUpApiResponses: ApiResponseOptions[] = [
  {
    status: 201,
    description: 'Sign up successful',
    headers: {
      'Set-Cookie': {
        description: 'Set cookie with user session',
        schema: {
          type: 'string',
          example: 'session.id=abc123; HttpOnly; Secure; SameSite=Strict',
        },
      },
    },
  },
  {
    status: 400,
    description: 'Bad request',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: { type: 'string', example: 'Validation failed' },
            error: { type: 'string', example: 'Bad Request' },
          },
        },
      },
    },
  },
  {
    status: 409,
    description: 'Conflict - User already exists',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 409 },
            message: { type: 'string', example: 'User already exists' },
            error: { type: 'string', example: 'Conflict' },
          },
        },
      },
    },
  },
];
