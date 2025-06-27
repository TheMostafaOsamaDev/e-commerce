import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { refreshTokenProviders } from './refresh-token.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...refreshTokenProviders],
  exports: [...refreshTokenProviders],
})
export class RefreshTokenModule {}
