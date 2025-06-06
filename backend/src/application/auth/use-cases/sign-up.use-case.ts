import { IUserRepository } from '../repositories/user.repository.interface';
import { SignUpDto } from '../dtos/sign-up.dto';
import { UserEntity } from '../../../domain/auth/user.entity';
import * as bcrypt from 'bcryptjs';
import { ConflictException, Inject } from '@nestjs/common';
import { DB_Providers } from '../../../common/constants/db.constants';

export class SignUpUseCase {
  constructor(
    @Inject(DB_Providers.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: SignUpDto) {
    const existingUser = await this.userRepository.findUserByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = new UserEntity();

    await user.create(
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.isAdmin,
      dto.password,
      async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
      },
    );

    await this.userRepository.createUser(user);

    return user;
  }
}
