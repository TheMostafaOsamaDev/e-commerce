import { randomBytes } from 'crypto';

export interface UserEntityProps {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  isAdmin?: boolean;
  hashPassword?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  isAdmin: boolean = false;
  hashPassword: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    email,
    firstName,
    lastName,
    username,
    isAdmin,
    hashPassword,
    createdAt,
    updatedAt,
  }: UserEntityProps = {}) {
    this.id = id || Math.floor(Math.random() * 1000000);
    this.email = email || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.username = username || '';
    this.isAdmin = isAdmin ?? false;
    this.hashPassword = hashPassword || '';
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();

    if (this.firstName && this.lastName && !this.username) {
      this.username = this.setUsername(this.firstName, this.lastName);
    }
  }

  create(
    email: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean = false,
    password: string,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isAdmin = isAdmin;
    this.hashPassword = password;
  }

  setUsername(firstName: string, lastName: string): string {
    const baseUsername = `${firstName.toLowerCase().replace(/\s+/g, '')}${lastName.toLowerCase().replace(/\s+/g, '')}`;

    const randomSuffix = randomBytes(8).toString('hex'); // Generate a random suffix

    return `${baseUsername}_${randomSuffix}`;
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }
}
