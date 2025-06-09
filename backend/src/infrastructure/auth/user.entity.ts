import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
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
}
