import { config } from 'dotenv';
import { Pool } from 'pg';
import { join } from 'path';

config({ path: join(process.cwd(), '.env') });
config({ path: join(process.cwd(), '.default.env') });

export async function connectToPg() {
    const pool = new Pool({
        user: process.env.PG_USER,
        port: +process.env.PG_PORT,
        host: process.env.PG_HOST,
        password: process.env.PG_PASS,
        database: process.env.PG_BASE,
    });

    const connection = await pool.connect();

    console.info('Connect to postgres');

    return connection;
}
