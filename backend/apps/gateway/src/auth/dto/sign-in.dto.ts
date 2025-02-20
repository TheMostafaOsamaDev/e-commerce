import { PickType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class SignInDto extends PickType(CreateAuthDto, ['email', 'password']) {}
