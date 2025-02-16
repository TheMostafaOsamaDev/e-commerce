import { AuthService } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    private readonly authClient;
    constructor(authService: AuthService, authClient: ClientProxy);
    createAccount(data: CreateAuthDto): import("rxjs").Observable<any>;
}
