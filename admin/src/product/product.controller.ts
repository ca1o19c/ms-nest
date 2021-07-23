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
    return this.productService.index();
  }

  @Post()
  async store(@Body('title') title: string, @Body('image') image: string) {
    const product = await this.productService.store({
      title,
      image,
    });

    this.client.emit('product_created', product);

    return product;
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
    await this.productService.update(id, { title, image });

    const product = await this.productService.show(id);

    this.client.emit('product_updated', product);

    return product;
  }

  @Delete(':id')
  async destroy(@Param('id') id: number) {
    await this.productService.destroy(id);

    this.client.emit('product_deleted', id);
  }
}
