import { IRefreshTokenEntity } from './refresh-token.entity.interface';

export interface IRefreshTokenRepository {
  createRefreshToken(
    userId: number,
    token: string,
    expiresAt: Date,
    ipAddress: string,
  ): Promise<IRefreshTokenEntity>;

  findByToken(token: string): Promise<IRefreshTokenEntity | null>;

  revokeToken(token: string): Promise<void>;

  revokeAllTokensForUser(userId: number): Promise<void>;

  findByUserId(userId: number): Promise<IRefreshTokenEntity[]>;

  // TODO: Add methods for replacedBy Token
}
