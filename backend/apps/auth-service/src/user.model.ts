import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';

@Table({ tableName: 'users' })
export class User extends Model<
  User,
  Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>
> {
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
    return bcrypt.compare(candidatePassword, this.password);
  }
}
