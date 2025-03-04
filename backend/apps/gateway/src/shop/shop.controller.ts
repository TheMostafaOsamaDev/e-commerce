import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @MessagePattern('createShop')
  create(@Payload() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @MessagePattern('findAllShop')
  findAll() {
    return this.shopService.findAll();
  }

  @MessagePattern('findOneShop')
  findOne(@Payload() id: number) {
    return this.shopService.findOne(id);
  }

  @MessagePattern('updateShop')
  update(@Payload() updateShopDto: UpdateShopDto) {
    return this.shopService.update(updateShopDto.id, updateShopDto);
  }

  @MessagePattern('removeShop')
  remove(@Payload() id: number) {
    return this.shopService.remove(id);
  }
}
