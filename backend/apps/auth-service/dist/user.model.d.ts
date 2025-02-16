import { Model } from 'sequelize-typescript';
export declare class User extends Model<User, Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>> {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    static hashPassword(instance: User): Promise<void>;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
