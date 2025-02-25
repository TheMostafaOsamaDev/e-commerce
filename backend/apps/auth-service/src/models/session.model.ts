import { STRING } from 'sequelize';
import { UUID } from 'sequelize';
import { Model } from 'sequelize';
import {
  Column,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'sessions' })
export class Session extends Model<
  Session,
  Pick<Session, 'id' | 'userId' | 'token' | 'authedAt'>
> {
  @PrimaryKey
  @Column({
    type: STRING,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: UUID,
    allowNull: false,
  })
  @BelongsTo(() => User)
  userId: string;

  @Column({
    type: STRING,
    allowNull: false,
  })
  token: string;

  @Column({
    type: STRING,
    allowNull: false,
  })
  authedAt: string;
}

export type SessionType = {
  key: string;
  userId: string;
  authedAt: string;
};
