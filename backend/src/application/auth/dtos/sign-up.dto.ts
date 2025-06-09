import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsEmail()
  @ApiProperty({ example: 'user@test.com' })
  email: string;

  @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
  @ApiProperty({ example: 'John' })
  firstName: string;

  @Length(2, 50, { message: 'Last name must be between 2 and 50 characters' })
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @Length(8, 50, { message: 'Password must be between 6 and 50 characters' })
  @ApiProperty({ example: '12345678' })
  password: string;
}
