import { Controller, Get } from '@nestjs/common';
import { ProductEntity } from './entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/search')
  async search(): Promise<ProductEntity[]> {
    const products = await this.productService.search();
    return products.map((product) => new ProductEntity(product));
  }
}
