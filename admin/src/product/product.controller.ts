import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async index() {
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