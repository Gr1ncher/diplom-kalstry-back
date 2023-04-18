const isProd = process.env.NODE_ENV === 'production';
export const rootConfiguration = async () => ({
  port: 1337,
  postgres: {
    host: isProd ? 'dk-postgres' : 'localhost',
    port: isProd ? 5432 : 5427,
    user: 'kalstry',
    password: 'password',
    dbName: 'diplom_kalstry_dev',
    autoLoadEntities: true,
    debug: process.env.NODE_ENV !== 'production',
  },
});
