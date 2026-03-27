import mysql, { Pool } from 'mysql2/promise';

let pool: Pool | null = null;

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getPool(): Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: requiredEnv('MYSQL_HOST'),
      port: Number(process.env.MYSQL_PORT ?? '3306'),
      user: requiredEnv('MYSQL_USER'),
      password: requiredEnv('MYSQL_PASSWORD'),
      database: requiredEnv('MYSQL_DATABASE'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
}

export async function ensureQuoteRequestsTable(): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS quote_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      company VARCHAR(160) NULL,
      email VARCHAR(160) NOT NULL,
      phone VARCHAR(40) NOT NULL,
      product_type VARCHAR(120) NOT NULL,
      quantity VARCHAR(80) NOT NULL,
      location VARCHAR(160) NULL,
      notes TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await getPool().query(sql);
}
