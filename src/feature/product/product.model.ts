import { BaseEntity } from '@/db';
import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { ProductRepository } from './product.repository';

interface ProductFileds {
  title: string;
  size: number;
  color: string;
  price: number;
}

@Entity({ tableName: 'product', customRepository: () => ProductRepository })
export class ProductModel extends BaseEntity {
  @Property()
  title: string;
  @Property()
  size: number;
  @Property()
  color: string;
  @Property()
  price: number;

  constructor({ title, size, color, price }: ProductFileds) {
    super();
    this.title = title;
    this.size = size;
    this.color = color;
    this.price = price;
  }

  [EntityRepositoryType]?: ProductRepository;
}
