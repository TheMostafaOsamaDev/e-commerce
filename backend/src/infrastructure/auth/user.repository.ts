import { IUserRepository } from '../../application/auth/repositories/user.repository.interface';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserEntity } from '../../domain/auth/user.entity';
import { toUserEntity } from './mappers/user.entity.mapper';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class UserRepository implements IUserRepository {
  private readonly repo: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(User);
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repo.findOne({
      where: { email },
    });

    if (!user) return null;

    return toUserEntity(user);
  }

  async signInUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.repo.findOne({
      where: { email },
    });

    if (!user) throw null;

    const userEntity = toUserEntity(user);

    const isValidPassword = await userEntity.validatePassword(
      password,
      async (plain, hashed) => {
        const bcrypt = require('bcryptjs');
        return bcrypt.compare(plain, hashed);
      },
    );

    return isValidPassword ? userEntity : null;
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    const existingUser = await this.findUserByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = this.repo.create({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      hashPassword: user.hashPassword, // Use the correct property name
    });

    const savedUser = await this.repo.save(newUser);

    return toUserEntity(savedUser);
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    const user = await this.repo.findOne({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return toUserEntity(user);
  }
}
