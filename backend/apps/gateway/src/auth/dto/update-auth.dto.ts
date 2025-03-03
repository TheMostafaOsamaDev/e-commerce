import { PickType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PickType(CreateAuthDto, [
  'firstName',
  'lastName',
] as const) {}
