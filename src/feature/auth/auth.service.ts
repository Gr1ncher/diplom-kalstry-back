import { BadRequestException, Injectable } from '@nestjs/common';

import { Option } from '@/types';
import { BadParamsException } from '@/exceptions';
import { SessionModel, SessionService } from '../session';
import { UserService } from '../user';
import { AuthModel } from './auth.model';
import { AuthRepository } from './auth.repository';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { AuthEntity } from './entities';
import { AUTH_TOKEN } from '@/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly authRepository: AuthRepository,
  ) {}

  async login({ email, password }: LoginAuthDto): Promise<AuthEntity> {
    const user = await this.userService.getByEmail(email, { populate: ['salt', 'passwordHash'] });
    if (user === null || !user.isPasswordEqual(password)) {
      throw new BadParamsException('Bad login or password');
    }
    const session = await this.sessionService.create(user);
    return new AuthEntity({ user, session });
  }

  async register({ email, password }: RegisterAuthDto): Promise<AuthEntity> {
    const existUser = await this.userService.getByEmail(email);
    if (existUser) {
      throw new BadParamsException('User with this email already exists');
    }
    const user = await this.userService.create(email, password);
    const session = await this.sessionService.create(user);
    return new AuthEntity({ user, session });
  }

  async logout(sessionId: string): Promise<void> {
    const session = await this.sessionService.getById(sessionId);
    if (session) {
      session.isExpired = true;
      await this.sessionService.flush();
    }
  }

  getById(id: string): Promise<Option<AuthModel>> {
    return this.authRepository.findOne({ id });
  }

  async getSessionByRequest(req: any): Promise<Option<SessionModel>> {
    const sessionId = req.cookies[AUTH_TOKEN];
    if (!sessionId) {
      return null;
    }
    const session = await this.sessionService.getById(sessionId, { populate: ['user'] });
    if (session === null || !session.user) {
      return null;
    }
    if (this.sessionService.isSessionExpired(session)) {
      return null;
    }
    return session;
  }
}
