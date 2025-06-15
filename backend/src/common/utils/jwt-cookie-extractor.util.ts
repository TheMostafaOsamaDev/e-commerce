import { Request } from 'express';

/**
 * Extracts JWT from cookie named 'Authorization' in the format 'Bearer <token>'.
 */
export function extractJwtFromCookie(req: Request): string | null {
  if (!req?.cookies) {
    return null;
  }

  const token: string | null = req.cookies['Authorization'];

  if (!token) {
    console.warn('JWT token not found in cookies');
    return null;
  }

  const splitToken = token.split(' ');

  if (splitToken.length !== 2 || splitToken[0] !== 'Bearer') {
    console.warn('Invalid JWT token format in cookie');
    return null;
  }

  return splitToken[1]; // Return the token part after 'Bearer'
}
