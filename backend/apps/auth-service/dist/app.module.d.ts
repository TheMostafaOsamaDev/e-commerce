import { OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';
export declare class AppModule implements OnModuleInit {
    private cacheManager;
    private readonly logger;
    constructor(cacheManager: Cache);
    onModuleInit(): Promise<void>;
}
