import { BcryptHasher } from './bcrypt-hasher.service';
import { PasswordHasherProvider } from '../../common/constants/providers.constants';

export const bcryptHasherProviders = [
  {
    provide: PasswordHasherProvider,
    useClass: BcryptHasher,
  },
];
