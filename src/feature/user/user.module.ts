import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
