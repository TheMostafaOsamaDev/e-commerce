import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user: UserType;
    verifiedUser: {
      data: UserType;
      isNew: boolean;
      token: string;
    };
  }
}
