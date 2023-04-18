import { UserEntity } from '@/feature/user';

export interface ILoginEntity {
  authToken: string;
  user: UserEntity;
}

export class LoginEntity implements ILoginEntity {
  authToken: string;
  user: UserEntity;

  constructor({ authToken, user }: ILoginEntity) {
    this.authToken = authToken;
    this.user = user;
  }
}
