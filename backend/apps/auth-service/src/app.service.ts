import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './user.model';

@Injectable()
export class AppService {
  async createUser(data: CreateAuthDto) {
    const [user, created] = await User.findOrCreate({
      where: { email: data.email },
      defaults: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    const userData = user.get({ plain: true });

    return {
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
  }
}
