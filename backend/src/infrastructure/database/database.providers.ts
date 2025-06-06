import {
  DB_CONNECTION_STRING,
  DB_DATA_SOURCE,
  DB_NAME,
} from '../config/constants';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DB_DATA_SOURCE,
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
