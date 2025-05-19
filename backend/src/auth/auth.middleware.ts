import { Injectable, NestMiddleware } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { Request, Response } from 'express';
import { auth } from 'src/lib/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: unknown) => void) {
    toNodeHandler(auth)(req, res);

    next();
  }
}
