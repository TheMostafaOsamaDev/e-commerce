import { IUserRepository } from '../../../domain/auth/interfaces/user.repository.interface';
import { SignUpDto } from '../dtos/sign-up.dto';
import { UserEntity } from '../../../domain/auth/user.entity';
import * as bcrypt from 'bcryptjs';
import { ConflictException, Inject } from '@nestjs/common';
import {
  DB_Providers,
  PasswordHasherProvider,
} from '../../../common/constants/providers.constants';
import { IPasswordHasher } from '../../../domain/auth/interfaces/password-hasher.interface';

export class SignUpUseCase {
  constructor(
    @Inject(DB_Providers.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PasswordHasherProvider)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(dto: SignUpDto) {
    const existingUser = await this.userRepository.findUserByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.passwordHasher.hash(dto.password);

    const user = new UserEntity();
    user.create(dto.email, dto.firstName, dto.lastName, false, hashedPassword);

    const createdUser = await this.userRepository.createUser(user);

    user.id = createdUser.id;

    return user;
  }
}
