import { Response } from 'express';
export declare class AuthService {
    createTokenCookie(res: Response, token: string): void;
}
