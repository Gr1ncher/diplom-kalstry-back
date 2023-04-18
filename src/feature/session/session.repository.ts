import { EntityRepository } from '@mikro-orm/postgresql';
import { SessionModel } from './session.model';

export class SessionRepository extends EntityRepository<SessionModel> {}
