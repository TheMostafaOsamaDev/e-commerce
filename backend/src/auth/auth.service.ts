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
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { SingInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: SignUpDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email already exists please login');
    }

    const hashedPassword = await hashPassword(createUserDto.password);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        username: generateUniqueUsername({
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
        }),
      },
    });

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
      hashedPassword: user.password,
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
