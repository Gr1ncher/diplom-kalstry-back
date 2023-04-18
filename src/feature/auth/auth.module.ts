import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthController } from './auth.controller';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, MikroOrmModule.forFeature([AuthModel])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
