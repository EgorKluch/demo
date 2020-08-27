import knex from 'knex';
import config from "#/server/config";

const db = knex({
  client: 'mysql',
  version: '8.0',
  connection: {
    host     : 'localhost',
    user     : config.db.user,
    password : config.db.password,
    database : config.db.name
  }
});

export default db;
