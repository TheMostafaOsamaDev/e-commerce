import { IRefreshTokenRepository } from '../../../domain/auth/interfaces/refresh-token.repository';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RefreshToken } from './refresh-token.entity';
import { IRefreshTokenEntity } from '../../../domain/auth/interfaces/refresh-token.entity.interface';

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private readonly repo: Repository<RefreshToken>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(RefreshToken);
  }

  async createRefreshToken(
    userId: number,
    token: string,
    expiresAt: Date,
    ipAddress: string,
  ): Promise<void> {
    this.repo.create({
      token,
      expiresAt,
      ipAddress,
      userId,
    });
  }

  async revokeToken(token: string): Promise<void> {
    await this.repo.delete({
      token,
    });
  }

  findByToken(token: string): Promise<IRefreshTokenEntity | null> {
    return this.repo.findOne({
      where: {
        token,
      },
      relations: ['user'],
    });
  }

  findByUserId(userId: number): Promise<IRefreshTokenEntity[]> {
    return this.repo.find({
      where: {
        userId,
      },
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  revokeAllTokensForUser(userId: number): Promise<void> {
    return this.repo
      .delete({
        userId,
      })
      .then(() => {});
  }
}
