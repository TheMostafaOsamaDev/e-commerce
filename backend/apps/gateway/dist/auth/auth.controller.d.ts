import { AuthService } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    private readonly authClient;
    constructor(authService: AuthService, authClient: ClientProxy);
    createAccount(data: CreateAuthDto): Promise<import("rxjs").Observable<any>>;
    signIn(data: SignInDto, res: Response): Promise<import("rxjs").Observable<any>>;
}
