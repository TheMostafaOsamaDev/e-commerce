import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './interface/auth/auth.module';
import { AppConfigModule } from './infrastructure/config/config.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, AuthModule],
  controllers: [],
})
export class AppModule {}
