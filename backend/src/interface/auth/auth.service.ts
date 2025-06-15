import { Injectable } from '@nestjs/common';
import { SignUpUseCase } from '../../application/auth/use-cases/sign-up.use-case';
import { SignUpDto } from '../../application/auth/dtos/sign-up.dto';
import { SignInUseCase } from '../../application/auth/use-cases/sign-in.use-case';
import { SignInDto } from '../../application/auth/dtos/sign-in.dto';
import { JwtService } from '../../infrastructure/auth/jwt/jwt.service';
import { UserEntity } from '../../domain/auth/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly jwtService: JwtService,
  ) {}

  signUp(dto: SignUpDto) {
    return this.signUpUseCase.execute(dto);
  }

  async signIn(dto: SignInDto) {
    return this.signInUseCase.execute(dto);
  }

  generateToken(user: UserEntity) {
    return this.jwtService.generate(user);
  }
}
