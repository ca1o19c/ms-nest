import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async index(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async storage(data): Promise<Product> {
    return new this.productModel(data).save();
  }

  async show(id: number): Promise<Product> {
    return this.productModel.findOne({ id });
  }

  async update(id: number, data): Promise<any> {
    return this.productModel.findOneAndUpdate({ id }, data);
  }

  async destroy(id: number): Promise<any> {
    return this.productModel.deleteOne({ id });
  }
}
