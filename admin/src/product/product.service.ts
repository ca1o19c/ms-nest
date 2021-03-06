import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async index(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async store(data): Promise<Product> {
    return this.productRepository.save(data);
  }

  async show(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async update(id: number, data): Promise<any> {
    return this.productRepository.update(id, data);
  }

  async destroy(id: number): Promise<any> {
    return this.productRepository.delete(id);
  }
}
