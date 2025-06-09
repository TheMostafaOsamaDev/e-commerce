import { DataSource } from 'typeorm';
import {
  DB_CONNECTION_STRING,
  DB_NAME,
  DB_Providers,
} from '../../common/constants/providers.constants';

export const databaseProviders = [
  {
    provide: DB_Providers.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: DB_CONNECTION_STRING,
        database: DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // Set to false in production
      });

      return dataSource.initialize();
    },
  },
];
