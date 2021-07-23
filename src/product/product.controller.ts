import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductController {
  @Get()
  all() {
    return { message: 'all products' };
  }
}
