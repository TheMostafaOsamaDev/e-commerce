import { Provider } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JWT_TOKEN_SERVICE } from '../../../common/constants/providers.constants';

export const JwtTokenProvider: Provider = {
  provide: JWT_TOKEN_SERVICE,
  useClass: JwtService,
};

export const JwtProviders = [JwtTokenProvider];
