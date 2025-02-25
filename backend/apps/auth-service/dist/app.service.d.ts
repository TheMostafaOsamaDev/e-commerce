import { CreateAuthDto } from './dto/create-auth.dto';
import { UserType } from './models/user.model';
import * as jwt from 'jsonwebtoken';
import { SignInDto } from './dto/sign-in.dto';
export declare class AppService {
    constructor();
    createUser(data: CreateAuthDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }>;
    createSession({ userData }: {
        userData: UserType;
    }): Promise<{
        token: string;
        user: UserType;
        authedAt: string;
    }>;
    generateToken({ userData, isHashed, authedAt, }: {
        userData: UserType;
        isHashed: boolean;
        authedAt: string;
    }): string;
    compareToken(userData: UserType, hashedToken: string): boolean;
    verifyToken(token: string): Promise<string | jwt.JwtPayload>;
}
