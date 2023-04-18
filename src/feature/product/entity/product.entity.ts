import { BaseReponseEntity, IBaseReponseEntity } from '@/utils';

export interface IUserEntity extends IBaseReponseEntity {
  title: string;
  size: number;
  color: string;
  price: number;
}

export class ProductEntity extends BaseReponseEntity {
  title: string;
  size: number;
  color: string;
  price: number;
  constructor({ title, size, color, price, ...rest }: IUserEntity) {
    super(rest);
    this.title = title;
    this.size = size;
    this.color = color;
    this.price = price;
  }
}
