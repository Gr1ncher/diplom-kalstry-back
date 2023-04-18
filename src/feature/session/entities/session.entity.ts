import { BaseReponseEntity, IBaseReponseEntity } from '@/utils';

export interface ISessionEntity extends IBaseReponseEntity {
  city: string;
}

export class SessionEntity extends BaseReponseEntity {
  /**
   * City where user is logged in. Determinate by client ip address. If for some reasons
   * city can't be obtained city = 'none'
   * @example Москва
   */
  city: string;

  constructor({ city, ...rest }: ISessionEntity) {
    super(rest);
    this.city = city;
  }
}
