import { Model } from 'sequelize';
export declare class Session extends Model<Session, Pick<Session, 'id' | 'userId' | 'token' | 'authedAt'>> {
    id: string;
    userId: string;
    token: string;
    authedAt: string;
}
export type SessionType = {
    key: string;
    userId: string;
    authedAt: string;
};
