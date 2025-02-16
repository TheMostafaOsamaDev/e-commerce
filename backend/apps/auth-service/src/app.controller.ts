import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_account' })
  createAccount(data: CreateAuthDto) {
    return this.appService.createUser(data);
  }
}
