import { Sequelize } from 'sequelize-typescript';
import { User } from './user.model'; // Import your User model

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  models: [User], // Register your models
  logging: false, // Disable logs (set to true for debugging)
});
