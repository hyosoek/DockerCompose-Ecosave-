//postgreSQL connection
import { config } from 'dotenv';
config({ path: '.env' });
import { Pool } from 'pg';

const client: Pool = new Pool({
  host: process.env.POSTGRSQL_HOST,
  // port: Number(process.env.POSTGRSQL_PORT),
  user: process.env.POSTGRSQL_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRSQL_DATABASE,
  max: Number(process.env.POSTGRSQL_MAX_POOL_COUNT),
});

export default client;
