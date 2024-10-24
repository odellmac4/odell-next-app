import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const connectToDatabase = async () => {
    return pool.connect();
};