import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsJWT, IsUUID } from 'class-validator';

export class UpdateAuthDto extends PickType(CreateAuthDto, [
  'firstName',
  'lastName',
] as const) {
  @IsUUID(4, { message: 'Invalid UUID' })
  id: string;

  @IsJWT({ message: 'Invalid JWT' })
  token: string;
}
