import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;
}
