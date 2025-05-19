import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import {
  comparePassword,
  generateUniqueUsername,
  hashPassword,
} from 'src/common/helpers';
import { SingInDto } from './dto/sign-in.dto';
import { auth } from 'src/lib/auth';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    signUpDto: SignUpDto,
  ): Promise<{ 'set-cookie': string; user: User }> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: signUpDto.email,
      },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email already exists please login');
    }

    const username = generateUniqueUsername({
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
    });

    const data = await auth.api.signUpEmail({
      body: {
        email: signUpDto.email,
        password: signUpDto.password,
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        username,
        name: signUpDto.firstName + ' ' + signUpDto.lastName,
      },
      returnHeaders: true,
    });

    const user = data.response.user;
    const setCookie = data.headers.get('set-cookie');

    if (!setCookie) {
      throw new UnauthorizedException('Failed to create user');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      'set-cookie': setCookie,
    };
  }

  async findUserByEmailAndPassword(signInUserDto: SingInDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInUserDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email ${signInUserDto.email} is incorrect`);
    }

    const isPasswordVaild = await comparePassword({
      password: signInUserDto.password,
      hashedPassword: '',
    });

    if (!isPasswordVaild) {
      throw new NotFoundException('Password is incorrect');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
