type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  passkey?: string;
};

type SignInType = {
  email: string;
  password: string;
};

type UpdateProfileType = {
  firstName: string;
  lastName: string;
};
