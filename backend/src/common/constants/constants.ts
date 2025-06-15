import { config } from 'dotenv';

config();

export const JWT_SECRET = process.env.JWT_SECRET! || 'jwt_secret_key';
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION || '20d';
