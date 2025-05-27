import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { generateUniqueUsername } from 'src/common/helpers';
import { SignInDto } from './dto/sign-in.dto';
import { auth } from 'src/lib/auth';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(signUpDto: SignUpDto): BetterAuthResponse {
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
        image: user.image || null,
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

  async findUserByEmailAndPassword(
    signInUserDto: SignInDto,
  ): BetterAuthResponse {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInUserDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const data = await auth.api.signInEmail({
      body: {
        email: signInUserDto.email,
        password: signInUserDto.password,
      },
      returnHeaders: true,
    });
    const setCookie = data.headers.get('set-cookie');

    if (!setCookie) {
      throw new UnauthorizedException('Failed to sign in');
    }

    return {
      user: {
        id: user.id,
        image: data.response.user.image || null,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      'set-cookie': setCookie,
    };
  }
}
