import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        required: true,
        description: 'First name of the user',
      },
      lastName: {
        type: 'string',
        required: true,
        description: 'Last name of the user',
      },
      username: {
        type: 'string',
        required: true,
        description: 'Username of the user',
      },
      profilePic: {
        type: 'string',
        required: false,
        description: 'Profile picture of the user',
      },
      role: {
        type: 'string',
        required: false,
        description: 'Role of the user',
        default: 'USER',
      },
      name: {
        type: 'string',
        required: false,
        description: 'Name of the user',
        default: '',
      },
    },
    fields: {
      name: undefined,
      image: undefined,
    },
  },
});
