type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

type BetterAuthResponse = Promise<{ 'set-cookie': string; user: User }>;
