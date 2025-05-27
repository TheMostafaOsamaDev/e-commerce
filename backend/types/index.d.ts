type User = {
  id: string;
  image?: string | null;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role?: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
};

type BetterAuthResponse = Promise<{ 'set-cookie': string; user: User }>;
