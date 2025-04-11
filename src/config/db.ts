import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Pool } = pg;
import { logger } from "../utils/logger.js";
import { config } from "./env.js";

const pool = new Pool({
  connectionString: config.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function testConnection() {
  try {
    const client = await pool.connect();
    logger.info("✅ Database connection successful!");
    client.release();
    return true;
  } catch (error) {
    logger.error("❌ Database connection failed!", error);
    return false;
  }
}

export const db = drizzle(pool, {
  logger: true,
});
