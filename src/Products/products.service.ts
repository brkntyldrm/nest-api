import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async store(@Req() request: Request) {
    return await this.productModel.create({
      name: request.body['name'],
      count: request.body['count'],
    });
  }

  async listProducts() {
    return await this.productModel.find();
  }
}
