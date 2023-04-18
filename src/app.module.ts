import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { rootConfiguration } from 'config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, ProductModule, SessionModule, UserModule } from './feature';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rootConfiguration],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgresql',
        ...configService.get('postgres'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ProductModule,
    SessionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
