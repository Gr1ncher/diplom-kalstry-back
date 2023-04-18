import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { AuthModel, ProductModel, SessionModel, UserModel } from '@/feature';

const logger = new Logger('MikroORM');

const config: Options = {
  entities: [AuthModel, ProductModel, SessionModel, UserModel],
  type: 'postgresql',
  host: process.env.NODE_ENV === 'production' ? 'dk-postgres' : 'localhost',
  port: 5427,
  user: 'kalstry',
  password: 'password',
  dbName: 'diplom_kalstry_dev',
  debug: true,
  logger: logger.log.bind(logger),
};

export default config;
