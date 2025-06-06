import { User } from '../user.entity';
import { UserEntity } from '../../../domain/auth/user.entity';

export function toUserEntity(user: User): UserEntity {
  return new UserEntity(
    user.id,
    user.email,
    user.firstName,
    user.lastName,
    user.isAdmin,
    user.hashPassword,
    user.createdAt,
    user.updatedAt,
  );
}
