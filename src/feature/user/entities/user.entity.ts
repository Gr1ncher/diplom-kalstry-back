import { BaseReponseEntity, IBaseReponseEntity } from '@/utils';

export interface IUserEntity extends IBaseReponseEntity {
  email: string;
}

export class UserEntity extends BaseReponseEntity {
  /**
   * User email address
   */
  email: string;

  constructor({ id, createdAt, updatedAt, email }: IUserEntity) {
    super({ id, createdAt, updatedAt });
    this.email = email;
  }
}
