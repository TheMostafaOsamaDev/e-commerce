import { AppService } from './app.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as jwt from 'jsonwebtoken';
import { UpdateAuthDto } from './dto/update-auth.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createAccount(data: CreateAuthDto): Promise<{
        token: string;
        user: import("./models/user.model").UserType;
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
    verifyToken(token: string): Promise<string | jwt.JwtPayload>;
    logoutUser(token: string): Promise<void>;
    updateProfile(data: UpdateAuthDto): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        token: string;
        isNew: boolean;
        message?: undefined;
    } | {
        message: string;
        user?: undefined;
        token?: undefined;
        isNew?: undefined;
    }>;
}
