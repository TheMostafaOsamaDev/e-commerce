import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IRefreshTokenEntity } from '../../../domain/auth/interfaces/refresh-token.entity.interface';
import { User } from '../user/user.entity';

@Entity('refresh_tokens')
export class RefreshToken implements IRefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  userId: number;

  @Column({ unique: true })
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  revoked: boolean;

  @Column()
  ipAddress: string;

  @Column({ nullable: true })
  replacedByToken?: string;

  // Relations
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
