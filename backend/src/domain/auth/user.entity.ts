export class UserEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean = false;
  hashPassword: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean = false,
    password: string,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isAdmin = isAdmin;
    this.hashPassword = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async validatePassword(
    password: string,
    compareFn: (plain: string, hashed: string) => Promise<boolean>,
  ) {
    return compareFn(password, this.hashPassword);
  }

  async generateUserName(
    generateFn: (name: string) => Promise<string>,
  ): Promise<string> {
    return generateFn(`${this.firstName} ${this.lastName}`);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }
}
