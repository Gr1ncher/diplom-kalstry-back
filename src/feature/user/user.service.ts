import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel } from './user.model';
import { UserRepository } from './user.repository';
import { Option } from '@/types';
import { FindOneOptions } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(email: string, password: string): Promise<UserModel> {
    const user = this.userRepository.create(new UserModel({ email, password }));
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async getByIdOrFail<T extends string>(id: string, options?: FindOneOptions<UserModel, T>): Promise<UserModel> {
    const user = await this.getById(id, options);
    if (!user) {
      throw new NotFoundException('User with this id not found');
    }
    return user;
  }

  async getById<T extends string>(id: string, options?: FindOneOptions<UserModel, T>): Promise<Option<UserModel>> {
    return this.userRepository.findOne({ id }, options);
  }

  async getByEmail<T extends string = never>(
    email: string,
    options?: FindOneOptions<UserModel, T>,
  ): Promise<Option<UserModel>> {
    return this.userRepository.findOne({ email }, options);
  }
}
