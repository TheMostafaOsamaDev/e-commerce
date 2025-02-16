import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './user.model';

@Injectable()
export class AppService {
  async createUser(data: CreateAuthDto) {
    const user = await User.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    return user;
  }
}
