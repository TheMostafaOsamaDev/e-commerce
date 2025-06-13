import { Inject } from '@nestjs/common';
import {
  PasswordHasherProvider,
  DB_Providers,
} from '../../../common/constants/providers.constants';
import { IUserRepository } from '../../../domain/auth/interfaces/user.repository.interface';
import { SignInDto } from '../dtos/sign-in.dto';
import { UserEntity } from '../../../domain/auth/user.entity';
import { IPasswordHasher } from '../../../domain/auth/interfaces/password-hasher.interface';

export class SignInUseCase {
  constructor(
    @Inject(DB_Providers.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PasswordHasherProvider)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(dto: SignInDto) {
    const user = await this.userRepository.findUserByEmail(dto.email);

    if (!user) {
      return null; // User not found
    }

    const userEntity = new UserEntity(user);

    const isValidPassword = await this.passwordHasher.compare(
      dto.password,
      userEntity.hashPassword,
    );

    if (!isValidPassword) {
      return null; // Invalid password
    }

    return userEntity; // Return the user entity if credentials are valid
  }
}
