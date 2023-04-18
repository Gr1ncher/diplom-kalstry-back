import { BooleanType, Entity, EntityRepositoryType, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '@/db';
import { SessionRepository } from './session.repository';
import { UserModel } from '../user';

interface SessionModelRequiredFields {
  user: UserModel;
  city: string;
}

@Entity({ tableName: 'session', customRepository: () => SessionRepository })
export class SessionModel extends BaseEntity {
  @Property()
  city: string;

  @Property({ type: BooleanType })
  isExpired = false;

  @ManyToOne()
  user: UserModel;

  constructor({ user, city }: SessionModelRequiredFields) {
    super();
    this.user = user;
    this.city = city;
  }

  [EntityRepositoryType]?: SessionRepository;
}
