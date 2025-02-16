import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './user.model';
export declare class AppService {
    createUser(data: CreateAuthDto): Promise<User>;
}
