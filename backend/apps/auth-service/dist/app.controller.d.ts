import { AppService } from './app.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createAccount(data: CreateAuthDto): Promise<{
        token: string;
        user: import("./user.model").UserType;
        authedAt: string;
    }>;
    signIn(data: SignInDto): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        token: string;
    }>;
    verifyToken(token: string): Promise<string | import("jsonwebtoken").JwtPayload>;
}
