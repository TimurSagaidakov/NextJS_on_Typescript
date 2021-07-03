export const config = {
  dbclient: 'pg',
  dbconection: process.env.DATABASE_URL || {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: '1q2w3e4r',
    database: 'test',
  },
  defaultLocale: 'ru-ru',
  useHttp2: false,
};