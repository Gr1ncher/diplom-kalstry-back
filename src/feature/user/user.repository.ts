import { EntityRepository } from '@mikro-orm/postgresql';
import { UserModel } from './user.model';

export class UserRepository extends EntityRepository<UserModel> {}
