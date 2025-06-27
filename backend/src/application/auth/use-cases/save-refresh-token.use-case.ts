import { Inject } from '@nestjs/common';
import { DB_Providers } from '../../../common/constants/providers.constants';
import { IRefreshTokenRepository } from '../../../domain/auth/interfaces/refresh-token.repository.interface';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

export class SaveRefreshTokenUseCase {
  constructor(
    @Inject(DB_Providers.REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute({ ipAddress, token, userId }: RefreshTokenDto) {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    return await this.refreshTokenRepository.createRefreshToken(
      userId,
      token,
      expiresAt,
      ipAddress,
    );
  }
}
