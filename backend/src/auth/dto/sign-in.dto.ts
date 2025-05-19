import { PickType } from '@nestjs/mapped-types';
import { SignUpDto } from './sign-up.dto';

export class SingInDto extends PickType(SignUpDto, [
  'email',
  'password',
] as const) {}
