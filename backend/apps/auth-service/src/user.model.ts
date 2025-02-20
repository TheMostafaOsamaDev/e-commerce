import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  Default,
  PrimaryKey,
} from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import { UUIDV4 } from 'sequelize';

@Table({ tableName: 'users' })
export class User extends Model<
  User,
  Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>
> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @BeforeCreate
  static async hashPassword(instance: User) {
    const saltRounds = 10;
    instance.password = await bcrypt.hash(instance.password, saltRounds);
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

export type UserType = {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
};
