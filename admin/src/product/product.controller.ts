import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async index() {
    this.client.emit('hello', 'Hello from RabbitMQ!');
    return this.productService.index();
  }

  @Post()
  async store(@Body('title') title: string, @Body('image') image: string) {
    return this.productService.store({
      title,
      image,
    });
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return this.productService.show(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    return this.productService.update(id, { title, image });
  }

  @Delete(':id')
  async destroy(@Param('id') id: number) {
    return this.productService.destroy(id);
  }
}
