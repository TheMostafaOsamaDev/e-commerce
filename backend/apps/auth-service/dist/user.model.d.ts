import { Model } from 'sequelize-typescript';
export declare class User extends Model<User, Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'isAdmin'>> {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    static hashPassword(instance: User): Promise<void>;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export type UserType = {
    id: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
};
