import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUserEntity } from '../../../domain/auth/interfaces/user.entity.interface';
import { RefreshToken } from '../refresh-token/refresh-token.entity';

@Entity('user')
export class User implements IUserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ length: 255 })
  hashPassword: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Relations
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
