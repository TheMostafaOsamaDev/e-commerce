import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model'; // Import your User model
import { Session } from './models/session.model';
import { Account } from './models/account.model';

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  models: [User, Session, Account], // Register your models
  logging: false, // Disable logs (set to true for debugging)
});
