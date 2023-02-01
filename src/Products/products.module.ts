import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Product } from 'src/schemas/product.schema';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
