import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
