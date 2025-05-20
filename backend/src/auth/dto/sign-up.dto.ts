import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  Matches,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is not valid' })
  @Transform(({ value }) => value?.toLowerCase()?.trim())
  email: string;

  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(2, { message: 'First name is too short, 2 characters minimum' })
  @MaxLength(50, { message: 'First name is too long, 50 characters maximum' })
  @Matches(/^[A-Za-z\s-]+$/, {
    message: 'First name must contain only letters, spaces, and hyphens',
  })
  @Transform(({ value }) => value?.trim())
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(2, { message: 'Last name is too short, 2 characters minimum' })
  @MaxLength(50, { message: 'Last name is too long, 50 characters maximum' })
  @Matches(/^[A-Za-z\s-]+$/, {
    message: 'Last name must contain only letters, spaces, and hyphens',
  })
  @Transform(({ value }) => value?.trim())
  lastName: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password is too short, 8 characters minimum' })
  @MaxLength(50, { message: 'Password is too long, 50 characters maximum' })
  @Transform(({ value }) => value?.trim())
  password: string;
}
