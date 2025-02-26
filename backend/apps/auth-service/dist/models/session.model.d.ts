import { Model } from 'sequelize-typescript';
import { User } from './user.model';
export declare class Session extends Model {
    id: string;
    userId: string;
    token: string;
    authedAt: string;
    user: User;
    lastAuthedAt: Date;
}
export type SessionType = {
    key: string;
    userId: string;
    authedAt: string;
};
