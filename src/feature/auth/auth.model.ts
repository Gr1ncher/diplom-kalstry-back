import { BaseEntity } from '@/db';
import { BooleanType, Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { AuthRepository } from './auth.repository';

interface AuthRequiredFileds {
  phoneNumber: string;
  code: string;
}

@Entity({ tableName: 'auth', customRepository: () => AuthRepository })
export class AuthModel extends BaseEntity {
  @Property({ nullable: false })
  phoneNumber: string;
  @Property({ nullable: false })
  code: string;
  @Property({ type: BooleanType })
  isValidated = false;

  constructor({ phoneNumber, code }: AuthRequiredFileds) {
    super();
    this.phoneNumber = phoneNumber;
    this.code = code;
  }

  [EntityRepositoryType]?: AuthRepository;
}
