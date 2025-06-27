import { User } from '../user/user.entity';
import { UserEntity } from '../../../domain/auth/user.entity';

export function toUserEntity(user: User): UserEntity {
  return new UserEntity(user);
}
