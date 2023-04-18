export interface ConfigPostgres {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
  autoLoadEntities: boolean;
  debug: boolean;
}

export interface ConfigRoot {
  port: string;
  postgres: ConfigPostgres;
}
