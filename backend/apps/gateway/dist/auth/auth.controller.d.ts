import { AuthService } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly authClient;
    constructor(authService: AuthService, authClient: ClientProxy);
    createAccount(data: CreateAuthDto): Promise<import("rxjs").Observable<any>>;
    signIn(data: SignInDto): Promise<import("rxjs").Observable<any>>;
    verify(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
