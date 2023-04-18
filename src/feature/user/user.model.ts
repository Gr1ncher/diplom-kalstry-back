import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToMany,
  OneToMany,
  OneToOne,
  OnInit,
  Property,
  TextType,
} from '@mikro-orm/core';
import { BaseEntity } from '@/db';
import { OptionMap } from '@/types';
import { UserRepository } from './user.repository';
import { SessionModel } from '../session/session.model';
import { pbkdf2Sync, randomBytes } from 'crypto';

export interface UserModelRequiredFields {
  email: string;
  password: string;
}

@Entity({ tableName: 'user', customRepository: () => UserRepository })
export class UserModel extends BaseEntity {
  @Property({ unique: true })
  email: string;

  @Property({ columnType: 'text', lazy: true, nullable: true })
  passwordHash?: string;

  @Property({ columnType: 'text', lazy: true, nullable: true })
  salt?: string;

  @Property({ persist: false })
  set password(pwd: string) {
    this.salt = randomBytes(16).toString('hex');
    this.passwordHash = pbkdf2Sync(pwd, this.salt, 1000, 64, 'sha512').toString('hex');
  }

  constructor({ email, password }: UserModelRequiredFields) {
    super();
    this.email = email;
    this.password = password;
  }

  isPasswordEqual(password: string): boolean {
    if (!this.salt || !this.passwordHash) {
      return false;
    }
    const hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.passwordHash === hash;
  }

  [EntityRepositoryType]?: UserRepository;
}
