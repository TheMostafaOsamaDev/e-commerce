import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern({ cmd: 'create_account' })
  createAccount(@Body() data: CreateAuthDto) {
    console.log('Received data:', data);
  }
}
