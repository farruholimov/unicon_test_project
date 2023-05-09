import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '..', '..', '.env') });

const { env } = process;

export const vars = {
  httpPort: env.HTTP_PORT || '8000',
  nodeEnv: env.NODE_ENV || 'development',
  token: {
    secret: env.ACCESS_TOKEN_SECRET,
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  },
};

export const pg = {
  host: env.PG_HOST,
  port: env.PG_PORT,
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DB_NAME,
  databaseDev: env.PG_DB_NAME_DEV,
  migrationsTable: env.PG_MIGRATIONS_TABLE,
  maxPool: 75,
  minPool: 2,
};
