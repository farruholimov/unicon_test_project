import knex from 'knex';
import knexConfig from './knexfile';
import { vars } from '../config/conf';

const knexInstance = knex(knexConfig[vars.nodeEnv]);

export default knexInstance;
