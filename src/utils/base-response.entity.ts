export interface IBaseReponseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class BaseReponseEntity {
  /**
   * UUID identificator 4 version.
   */
  id: string;
  /**
   * Date of create model in data base
   * @example 2022-12-24 17:09:03+00
   */
  createdAt: Date;
  /**
   * Date of last update model in data base
   * @example 2022-12-24 17:09:03+00
   */
  updatedAt: Date;

  constructor({ id, createdAt, updatedAt }: IBaseReponseEntity) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class DeleteResponseEntity {
  deleteCount: number;

  constructor(options: { deleteCount: number } | number) {
    if (typeof options === 'number') {
      this.deleteCount = options;
    } else {
      this.deleteCount = options.deleteCount;
    }
  }
}
