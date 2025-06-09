import { UserEntity } from '../user.entity';
import { SignUpDto } from '../../../application/auth/dtos/sign-up.dto';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<UserEntity | null>;

  createUser(user: UserEntity): Promise<UserEntity>;

  signInUser(
    email: string,
    password: string,
    compareFn: (plain: string, hashed: string) => Promise<boolean>,
  ): Promise<UserEntity | null>;

  findUserById(id: number): Promise<UserEntity | null>;

  findUserByEmail(email: string): Promise<UserEntity | null>;
}
