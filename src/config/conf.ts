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
