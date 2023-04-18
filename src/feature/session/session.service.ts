import { Injectable } from '@nestjs/common';
import { FindOneOptions } from '@mikro-orm/core';

import { Option } from '@/types';
import { SessionModel } from './session.model';
import { SessionRepository } from './session.repository';
import { UserModel } from '../user/user.model';

@Injectable()
export class SessionService {
  // private readonly sessionRepository: SessionRepository;
  // private readonly _em: EntityManager;

  constructor(private readonly sessionRepository: SessionRepository) {
  // constructor(private readonly em: EntityManager) {
    // this._em = em.fork();
    // this.sessionRepository = this._em.repo(SessionModel);
  }

  async create(user: UserModel): Promise<SessionModel> {
    return this.createByModel(new SessionModel({ user, city: 'none' }));
  }

  async createByModel(sessionModel: SessionModel): Promise<SessionModel> {
    const session = this.sessionRepository.create(sessionModel);
    await this.sessionRepository.persistAndFlush(session);
    return session;
  }

  isSessionExpired(session: SessionModel): boolean {
    return (new Date() as any) - (session.createdAt as any) > 1000 * 60 * 60 * 24;
  }

  getById<P extends string = never>(
    id: string,
    options?: FindOneOptions<SessionModel, P>,
  ): Promise<Option<SessionModel>> {
    return this.sessionRepository.findOne({ id }, options);
  }

  flush(): Promise<void> {
    return this.sessionRepository.flush();
  }
}
