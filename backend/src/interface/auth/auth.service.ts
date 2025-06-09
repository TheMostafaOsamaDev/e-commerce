import { Inject, Injectable } from '@nestjs/common';
import { SignUpUseCase } from '../../application/auth/use-cases/sign-up.use-case';
import { SignUpDto } from '../../application/auth/dtos/sign-up.dto';
import { PasswordHasherProvider } from '../../common/constants/providers.constants';
import { IPasswordHasher } from '../../domain/auth/interfaces/password-hasher.interface';
import { SignInUseCase } from '../../application/auth/use-cases/sign-in.use-case';
import { SignInDto } from '../../application/auth/dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    @Inject(PasswordHasherProvider) passwordHasher: IPasswordHasher,
  ) {}

  signUp(dto: SignUpDto) {
    return this.signUpUseCase.execute(dto);
  }

  async signIn(dto: SignInDto) {
    return this.signInUseCase.execute(dto);
  }
}
