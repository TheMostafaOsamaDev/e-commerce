export interface IUserEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  isAdmin: boolean;
  hashPassword: string;
  createdAt: Date;
  updatedAt: Date;
}
