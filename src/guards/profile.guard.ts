import { AUTH_TOKEN } from '@/constants';
import { SessionService } from '@/feature/session/session.service';
import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from '@nestjs/common';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => SessionService))
    private readonly sessionService: SessionService
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionId = request.cookies[AUTH_TOKEN];
    if (!sessionId) {
      return false;
    }
    const session = await this.sessionService.getById(sessionId, { populate: ['user'] });
    if (session === null || !session.user) {
      return false;
    }
    if (this.sessionService.isSessionExpired(session)) {
      return false;
    }
    request.session = session;
    return true;
  }
}
