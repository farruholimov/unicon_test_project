import type { Knex } from 'knex';
import { pg } from '../config/conf';

const {
  database,
  databaseDev,
  host,
  maxPool,
  migrationsTable,
  minPool,
  password,
  port,
  user,
} = pg;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: `postgres://${user}:${password}@${host}:${port}/${databaseDev}`,
    pool: {
      min: minPool,
      max: maxPool,
    },
    migrations: {
      tableName: migrationsTable
    },
    seeds: {
      directory: './seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: `postgres://${user}:${password}@${host}:${port}/${database}`,
    pool: {
      min: minPool,
      max: maxPool,
    },
    migrations: {
      tableName: migrationsTable,
    },
  },
};

export default config;
