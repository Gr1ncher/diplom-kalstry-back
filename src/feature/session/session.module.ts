import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SessionModel } from './session.model';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([SessionModel])],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
