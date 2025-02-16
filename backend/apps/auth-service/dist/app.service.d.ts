import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AppService {
    createUser(data: CreateAuthDto): Promise<{
        id: any;
        email: string;
        firstName: string;
        lastName: string;
    }>;
}
