import { Request } from 'express';

type UserRequest = Request & {
  user?: User;
};
