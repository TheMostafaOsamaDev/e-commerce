import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({ example: 'user@test.com' })
  email: string;

  @IsNotEmpty({ message: 'First name is required' })
  @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
  @ApiProperty({ example: 'John' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @Length(2, 50, { message: 'Last name must be between 2 and 50 characters' })
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 50, { message: 'Password must be between 6 and 50 characters' })
  @ApiProperty({ example: '12345678' })
  password: string;

  isAdmin?: boolean;
  id?: number;
}
