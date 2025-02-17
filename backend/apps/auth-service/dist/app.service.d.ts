import { CreateAuthDto } from './dto/create-auth.dto';
import { UserType } from './user.model';
import { Cache } from 'cache-manager';
export declare class AppService {
    private cacheManager;
    constructor(cacheManager: Cache);
    createUser(data: CreateAuthDto): Promise<{
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
    }>;
    generateToken({ userData, isHashed, }: {
        userData: UserType;
        isHashed: boolean;
    }): string;
}
