import pg from "pg";
import dotenv from "dotenv";

const isDocker = process.env.DB_HOST === "db";

dotenv.config();
const { Pool } = pg;

export const pool = new pg.Pool({
  host: isDocker ? "db" : "localhost",
  user: process.env.DB_USER || "bip",
  password: process.env.DB_PASS || "bip",
  database: process.env.DB_NAME || "bip",
  port: Number(process.env.DB_PORT) || 5432,
});
