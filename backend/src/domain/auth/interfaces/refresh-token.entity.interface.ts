import { IUserEntity } from './user.entity.interface';

export interface IRefreshTokenEntity {
  id: string;
  userId: number;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  revoked: boolean;
  ipAddress: string;
  user?: IUserEntity;
  replacedByToken?: string;
}
