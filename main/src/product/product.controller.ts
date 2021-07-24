import { Controller, Get, Param, Post } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private httpService: HttpService,
  ) {}

  @Get()
  async index() {
    return this.productService.index();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.show(id);

    this.httpService
      .post(`http://localhost:8000/api/products/${id}/like`, {})
      .subscribe((res) => {
        console.log(res);
      });

    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }

  @EventPattern('product_created')
  async productCreated(product: any) {
    await this.productService.storage({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product_updated')
  async productUpdate(product: any) {
    await this.productService.update(product.id, {
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product_deleted')
  async productDeleted(id: number) {
    await this.productService.destroy(id);
  }
}
