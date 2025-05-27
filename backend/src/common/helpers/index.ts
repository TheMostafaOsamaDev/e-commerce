import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async ({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// User
import { randomBytes } from 'crypto';
export const generateUniqueUsername = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const randomString = randomBytes(10).toString('hex');
  const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${randomString}`;

  return username;
};
