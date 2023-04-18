import { Injectable } from '@nestjs/common';
import { ProductModel } from './product.model';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  search(): Promise<ProductModel[]> {
    return this.productRepository.find({}, { orderBy: { createdAt: 'ASC' } });
  }
}
