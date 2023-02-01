import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.listProducts();
  }

  @Post()
  storeProduct(@Req() request: Request) {
    return this.productService.store(request);
  }
}
