import { EntityRepository } from '@mikro-orm/postgresql';
import { ProductModel } from './product.model';

export class ProductRepository extends EntityRepository<ProductModel> {}
