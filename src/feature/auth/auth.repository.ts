import { EntityRepository } from '@mikro-orm/postgresql';
import { AuthModel } from './auth.model';

export class AuthRepository extends EntityRepository<AuthModel> {}
