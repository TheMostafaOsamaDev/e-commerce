import * as bcrypt from 'bcryptjs';
import { IPasswordHasher } from '../../domain/auth/interfaces/password-hasher.interface';

export class BcryptHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}
