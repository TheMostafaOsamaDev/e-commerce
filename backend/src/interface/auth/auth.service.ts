import { Injectable } from '@nestjs/common';
import { SignUpUseCase } from '../../application/auth/use-cases/sign-up.use-case';
import { SignUpDto } from '../../application/auth/dtos/sign-up.dto';
import { SignInUseCase } from '../../application/auth/use-cases/sign-in.use-case';
import { SignInDto } from '../../application/auth/dtos/sign-in.dto';
import { JwtService } from '../../infrastructure/auth/jwt/jwt.service';
import { UserEntity } from '../../domain/auth/user.entity';
import { SaveRefreshTokenUseCase } from '../../application/auth/use-cases/save-refresh-token.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly saveRefreshTokenUseCase: SaveRefreshTokenUseCase,
    private readonly jwtService: JwtService,
  ) {}

  signUp(dto: SignUpDto) {
    return this.signUpUseCase.execute(dto);
  }

  async signIn(dto: SignInDto) {
    return this.signInUseCase.execute(dto);
  }

  async generateTokens(ipAddress, user: UserEntity) {
    const accessToken = this.jwtService.signAccessToken(user);
    const refreshToken = this.jwtService.signRefreshToken(user);

    const refreshTokenEntity = await this.saveRefreshTokenUseCase.execute({
      userId: user.id,
      token: refreshToken,
      ipAddress,
    });

    return {
      accessToken,
      refreshToken,
      refreshTokenEntity,
    };
  }
}
