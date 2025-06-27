import { config } from 'dotenv';

config();

export const JWT_SECRET = process.env.JWT_SECRET! || 'jwt_secret_key';
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION || '1h';
export const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'access_token';
export const JWT_COOKIE_EXPIRATION =
  (process.env.JWT_COOKIE_EXPIRATION &&
    parseInt(process.env.JWT_COOKIE_EXPIRATION)) ||
  60 * 60 * 1000;

// Refresh Token Constants
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret_key';
export const REFRESH_TOKEN_EXPIRATION_TIME =
  process.env.REFRESH_TOKEN_EXPIRATION || '30d';
export const REFRESH_TOKEN_COOKIE_NAME =
  process.env.REFRESH_TOKEN_COOKIE_NAME || 'refresh_token';
export const REFRESH_TOKEN_COOKIE_EXPIRATION =
  (process.env.REFRESH_TOKEN_COOKIE_EXPIRATION &&
    parseInt(process.env.REFRESH_TOKEN_COOKIE_EXPIRATION)) ||
  30 * 24 * 60 * 60 * 1000;
