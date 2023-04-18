import { SessionEntity, SessionModel, UserEntity, UserModel } from '@/feature';
import { getEntityByModel } from '@/utils';

export interface IAuthEntity {
  session: SessionEntity | SessionModel;
  user: UserEntity | UserModel;
}
export class AuthEntity implements IAuthEntity {
  session: SessionEntity;
  user: UserEntity;

  constructor({ session, user }: IAuthEntity) {
    this.session = getEntityByModel(session, SessionEntity);
    this.user = getEntityByModel(user, UserEntity);
  }
}
