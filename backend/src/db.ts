import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const useSSL = process.env.DB_HOST && !process.env.DB_HOST.includes(".internal");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: useSSL ? { rejectUnauthorized: false } : false
});

export { pool };
