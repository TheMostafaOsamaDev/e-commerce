import { Request, Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
export declare class AuthService {
    private readonly authClient;
    constructor(authClient: ClientProxy);
    createTokenCookie(res: Response, token: string): void;
    verifyToken(req: Request): Promise<any>;
}
