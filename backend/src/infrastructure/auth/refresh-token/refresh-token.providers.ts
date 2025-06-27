import { DB_Providers } from '../../../common/constants/providers.constants';
import { RefreshTokenRepository } from './refresh-token.repository';

export const refreshTokenProviders = [
  {
    provide: DB_Providers.REFRESH_TOKEN_REPOSITORY,
    useFactory: (dataSource) => {
      return new RefreshTokenRepository(dataSource);
    },
    inject: [DB_Providers.DATA_SOURCE],
  },
];
