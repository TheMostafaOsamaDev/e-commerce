import { DB_Providers } from '../../../common/constants/providers.constants';
import { RefreshTokenRepository } from './refresh-token.repository';
import { DataSource } from 'typeorm';

export const refreshTokenProviders = [
  {
    provide: DB_Providers.REFRESH_TOKEN_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return new RefreshTokenRepository(dataSource);
    },
    inject: [DB_Providers.DATA_SOURCE],
  },
];
