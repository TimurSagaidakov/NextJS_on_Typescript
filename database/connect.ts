// import knex from 'knex';
// import { config } from './config';

// export const db = knex({
//   client: config.dbclient,
//   connection: config.dbconection,
//   migrations: { tableName: 'migrations' },
//   // debug: process.env.DATABASE_DEBUG === 'true',
// });
import { Knex, knex } from 'knex'

// interface User {
//   id: number;
//   age: number;
//   name: string;
//   active: boolean;
//   departmentId: number;
// }

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1q2w3e4r',
    database: 'test',
  },
};

export const knexInstance = knex(config);

// try {
//   const users = await knex<User>('users').select('id', 'age');
// } catch (err) {
//   // error handling
// }