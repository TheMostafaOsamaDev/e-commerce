import { Injectable } from '@nestjs/common';
import { SignUpUseCase } from '../../application/auth/use-cases/sign-up.use-case';
import { SignUpDto } from '../../application/auth/dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async signUp(dto: SignUpDto) {
    return this.signUpUseCase.execute(dto);
  }
}
