import { DB_Providers } from '../../common/constants/db.constants';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

export const userProviders = [
  {
    provide: DB_Providers.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return new UserRepository(dataSource);
    },
    inject: [DB_Providers.DATA_SOURCE],
  },
];
