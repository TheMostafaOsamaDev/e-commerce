import { CreateAuthDto } from './dto/create-auth.dto';
import { UserType } from './user.model';
import { Cache } from 'cache-manager';
import { SignInDto } from './dto/sign-in.dto';
export declare class AppService {
    private cacheManager;
    constructor(cacheManager: Cache);
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
    cacheSessions({ userData }: {
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
}
