import { AuthService } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';
export declare class AuthController {
    private readonly authService;
    private readonly authClient;
    constructor(authService: AuthService, authClient: ClientProxy);
    createAccount(data: any): void;
}
