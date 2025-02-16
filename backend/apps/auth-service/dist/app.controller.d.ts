import { AppService } from './app.service';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createAccount(data: CreateAuthDto): Promise<import("./user.model").User>;
}
