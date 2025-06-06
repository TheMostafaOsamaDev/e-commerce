import { UserEntity } from './user.entity';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<{ id: string; email: string } | null>;

  createUser(email: string, password: string): Promise<UserEntity>;

  signInUser(
    email: string,
    password: string,
    hashFn: (plain: string) => Promise<string>,
    compareFn: (plain: string, hashed: string) => Promise<boolean>,
  ): Promise<UserEntity>;

  findUserById(id: string): Promise<UserEntity | null>;

  findUserByEmail(email: string): Promise<UserEntity | null>;
}
