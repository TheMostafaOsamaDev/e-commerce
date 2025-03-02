import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsUUID } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsUUID('4', { message: 'Please provide a valid user id' })
  id: number;
}
