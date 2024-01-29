import * as mysql2 from 'mysql2';
require("dotenv").config();

const DB_HOST: string = process.env.DB_HOST!;
const DB_USER: string = process.env.DB_USER!;
const DB_PASSWORD: string = process.env.DB_PASSWORD!;
const DB_NAME: string = process.env.DB_NAME!;

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql2.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
