import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsJWT, IsUUID } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsUUID(4, { message: 'Invalid UUID' })
  id: string;

  @IsJWT({ message: 'Invalid JWT' })
  token: string;
}
